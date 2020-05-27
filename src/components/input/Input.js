import React, { Component } from 'react'
import { taskContext } from '../../Context';
import './input.css';

export class Input extends Component {
  constructor(props){
    super(props)

    this.state = { value: '' }
    this.addTask = this.addTask.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }

  addTask(){
    if(this.state.value.length !== 0) this.context.addTask(this.state.value);
    this.setState({ value: '' })
  }

  changeInput(e){
    this.setState({
      value: e.target.value
    });
  }
  static contextType = taskContext;
  render() {
    return (
      <div id="todo_input">
        <input className="form-control" placeholder="Add task" onChange={this.changeInput} value={this.state.value}/>
        <button className="btn btn-success" onClick={this.addTask}>Add</button>
      </div>
    )
  }
}

export default Input