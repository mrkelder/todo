import React, { Component } from 'react';
import { taskContext } from '../../../Context';
import axios from 'axios';
import './task.css';

export class Task extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  deleteTask() {
    axios.get('http://localhost:8080/deleteTask', { params: { _id: this.props.task._id } });
    this.context.removeTask(this.props.task._id);
  }

  completeTask() {
    const completed = this.props.task.completed;
    axios.get('http://localhost:8080/completeTask', { params: { _id: this.props.task._id, completed } });
    this.context.completeTask(this.props.task._id);
  }

  static contextType = taskContext;
  render() {
    const { name, completed } = this.props.task;
    return (
      <li className="list-group-item tasks">
        <span onClick={this.completeTask} style={completed === true ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{name}</span>
        <button className="btn btn-danger" onClick={this.deleteTask}>Remove</button>
      </li>
    );
  }
}

export default Task
