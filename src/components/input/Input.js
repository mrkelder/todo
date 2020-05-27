import React, { Component } from 'react'
import './input.css';

export class Input extends Component {
  render() {
    return (
      <div id="todo_input">
        <input className="form-control" placeholder="Add task"/>
        <button className="btn btn-success">Add</button>
      </div>
    )
  }
}

export default Input
