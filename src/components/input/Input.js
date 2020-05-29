import React, { Component } from 'react'
import { taskContext } from '../../Context';
import axios from 'axios';
import './input.css';

export class Input extends Component {
  constructor(props) {
    super(props)

    this.state = { value: '' }
    this.addTask = this.addTask.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keypress', e => {
      if (e.code.toLocaleLowerCase() === 'enter') this.addTask();
    });
  }

  addTask() {
    if (this.state.value.length !== 0) {
      const text = this.state.value;
      axios.get('http://localhost:8080/addTask', { params: { name: text } }).then(info => {
        this.context.addTask({ text: text, id: info.data });
      });
    }
    this.setState({ value: '' });
  }

  changeInput(e) {
    console.log(this.state.value)
    this.setState({
      value: e.target.value
    });
  }
  static contextType = taskContext;
  render() {
    return (
      <div id="todo_input">
        <input className="form-control" placeholder="Add task" onChange={this.changeInput} value={this.state.value} />
        <button className="btn btn-success" onClick={this.addTask}>Add</button>
      </div>
    )
  }
}

export default Input
