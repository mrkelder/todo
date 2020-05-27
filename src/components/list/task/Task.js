import React, { Component } from 'react';
import { taskContext } from '../../../Context';
import './task.css';

export class Task extends Component {
  constructor(props){
    super(props);

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(){
    this.context.removeTask(this.props.taskId);
  }

  static contextType = taskContext;
  render() {
    return (
      <li className="list-group-item tasks">
        <span>{this.props.value}</span>
        <button className="btn btn-danger" onClick={this.deleteTask}>Remove</button>
      </li>
    )
  }
}

export default Task
