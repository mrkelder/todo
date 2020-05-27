import React, { Component } from 'react'
import './task.css';

export class Task extends Component {
  render() {
    return (
      <li className="list-group-item tasks">
        <span>{this.props.value}</span>
        <button className="btn btn-danger">Remove</button>
      </li>
    )
  }
}

export default Task
