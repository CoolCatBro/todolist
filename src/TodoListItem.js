import React from 'react';
import {ListGroup, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const TodoListItem = (props) => {
    return (
        <>
        <ListGroup.Item>
            <Form.Check type="checkbox" label={props.title} checked={props.completed}
            onChange = {
                () => props.updateCheckBox(props.index)
            }/>
            <FontAwesomeIcon icon={faTrash} onClick={() => props.deleteTodoByIndex(props.index)}/>
        </ListGroup.Item>
        </>
    );
};

export default TodoListItem;