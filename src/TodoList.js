import React, { Component } from 'react';
import { Card, ListGroup, InputGroup, FormControl, Button} from 'react-bootstrap';
import TodoListItem from './TodoListItem';

class TodoList extends Component {
    
    constructor() {
        super();

        this.state = {
            current_value: '',
            todos:[
            ]
        };

        fetch("https://ktodoapi.azurewebsites.net/todo")
        .then((res) => res.json())
        .then((result) => {
          this.setState({
              todos: result
          })  
        })

        this.deleteTodoByIndex = this.deleteTodoByIndex.bind(this);
        this.updateCheckBox = this.updateCheckBox.bind(this);
    }

    deleteTodoByIndex(index) {
        let id = this.state.todos[index]._id;

        fetch("https://ktodoapi.azurewebsites.net/todo/"+id,
        {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        this.setState(prevState => ({
            todos: [...prevState.todos.slice(0,index),...prevState.todos.slice(index+1)]
        }))
    }

    updateCheckBox(index) {
        let id = this.state.todos[index]._id;
        let state = "false";

        if(!this.state.todos[index].completed)
            state = "true";

        fetch("https://ktodoapi.azurewebsites.net/todo/"+id+"?state="+state,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            result.completed = !result.completed;
            this.setState(prevState => ({
                todos: [...prevState.todos.slice(0,index),
                        result
                        ,...prevState.todos.slice(index+1)]
                }));
        });        
    }

    render() {
        return (
            <Card className="TodoList">
                <Card.Header>ToDo List</Card.Header>
                <ListGroup variant="flush">
                {
                    this.state.todos.map((todo,index) => {
                        return (
                            <TodoListItem key={index} title={todo.todo} completed={todo.completed} index={index} deleteTodoByIndex={this.deleteTodoByIndex} updateCheckBox = {this.updateCheckBox}/>
                        );
                    })
                }
                    <ListGroup.Item>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Enter New Todo"
                            value = {this.state.current_value}
                            onChange = { 
                                (event) => {
                                    this.setState({current_value: event.target.value});
                                }
                            }
                            />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" 
                            onClick = {
                                () => {
                                fetch("https://ktodoapi.azurewebsites.net/todo",
                                {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({todo: this.state.current_value})
                                })
                                .then((res) => res.json())
                                .then((result) => {
                                    this.setState(prevState =>({
                                        todos: prevState.todos.concat(result)}))
                                })
                                this.setState({current_value: ""});
                            }
                            }
                            >Add</Button>
                        </InputGroup.Append>
                        </InputGroup>
                </ListGroup.Item>
                </ListGroup>
            </Card>
        );
    }
}

export default TodoList;