import React, { Component } from 'react';
import { taskContext } from '../../Context';
import axios from 'axios';
import './input.css';

export class Input extends Component {
  constructor(props) {
    super(props)

    this.state = { value: '', isOpened: false }
    this.addTask = this.addTask.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.openSchedule = this.openSchedule.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keypress', e => {
      if (e.code.toLocaleLowerCase() === 'enter') this.addTask();
    });
  }

  addTask() {
    if (this.state.value.length !== 0) {
      const text = this.state.value;
      axios.get('http://localhost:8080/addTask', { params: { name: text, date: this.context.dateForTask } }).then(info => {
        this.context.addTask({ text: text, id: info.data, date: this.context.dateForTask });
      });
    }
    this.setState({ value: '' });
  }

  changeInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  openSchedule() {
    this.setState(state => ({
      isOpened: !state.isOpened
    }));
  }

  static contextType = taskContext;
  render() {
    return (
      <div id="todo_input">
        <input className="form-control" placeholder="Add task" onChange={this.changeInput} value={this.state.value} />
        {
          this.context.isCalendarOpen ?
            <svg className="bi bi-calendar-check-fill schedule" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={this.context.openCalendar}>
              <path fillRule="evenodd" d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM0 5h16v9a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5zm10.854 3.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
            </svg>
            :
            <svg className="bi bi-calendar-check schedule" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={this.context.openCalendar}>
              <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              <path fillRule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z" />
              <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z" />
            </svg>
        }
        <button className="btn btn-success" onClick={this.addTask}>Add</button>
      </div>
    )
  }
}

export default Input
