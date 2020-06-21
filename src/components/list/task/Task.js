import React, { useContext } from 'react';
import { taskContext } from '../../../Context';
import axios from 'axios';
import './task.css';

const Task = (props) => {
  const context = useContext(taskContext);

  const deleteTask = () => {
    axios.get('http://localhost:8080/deleteTask', { params: { _id: props.task._id } });
    context.removeTask(props.task._id);
  };

  const completeTask = () => {
    const completed = props.task.completed;
    axios.get('http://localhost:8080/completeTask', { params: { _id: props.task._id, completed } });
    context.completeTask(props.task._id);
  };

  const { name, completed } = props.task;

  return (
    <li className="list-group-item tasks">
      <span onClick={completeTask} style={completed === true ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{name}</span>
      <button className="btn btn-danger" onClick={deleteTask}>Remove</button>
    </li>
  );
};

export default Task
