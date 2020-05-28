import React, { Component } from 'react';
import { taskContext } from '../../../Context';
import './task.css';

export class Task extends Component {
  constructor(props){
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  deleteTask(){
    this.context.removeTask(this.props.task._id);
  }

  completeTask(){
    this.context.completeTask(this.props.task._id);
  }

  static contextType = taskContext;
  render() {
    const { name , completed } = this.props.task;
    return (
      <li className="list-group-item tasks">
        <span onClick={this.completeTask} style={completed === true ? { textDecoration: 'line-through' } : {textDecoration: 'none' }}>{name}</span>
        <button className="btn btn-danger" onClick={this.deleteTask}>Remove</button>
      </li>
    )
  }
}

export default Task
