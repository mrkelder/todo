import React, { Component } from 'react';
import Wrapper from './components/wrapper/Wrapper';
import Input from './components/input/Input';
import List from './components/list/List';
import Calendar from './components/calendar/Calendar';
import ChooseDate from './components/chooseDate/chooseDate';
import axios from 'axios';
import { taskContext } from './Context';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: undefined,
      loaded: false,
      dateForTask: new Date(),
      currentDate: new Date(),
      isCalendarOpen: false
    }
    this.removeTask = this.removeTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.renderTasks = this.renderTasks.bind(this);
    this.getDate = this.getDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.changeCurrentDate = this.changeCurrentDate.bind(this);
  }

  componentDidMount() {
    this.renderTasks();
  }

  openCalendar() {
    this.setState(state => ({ isCalendarOpen: !state.isCalendarOpen }));
  }

  changeCurrentDate(date) {
    this.setState({ currentDate: date });
  }

  renderTasks() {
    // Renders tasks
    this.setState({ tasks: undefined, loaded: false });
    axios.get('http://localhost:8080/getTasks', { params: { rule: JSON.stringify({}) } })
      .then(info => { this.setState({ tasks: info.data, loaded: true }) })
      .catch(err => { this.setState({ loaded: true }); console.error(err); });
  }

  removeTask(id) {
    this.setState(oldState => {
      const { tasks } = oldState;
      return ({
        tasks: tasks.filter(task => task._id !== id)
      });
    });
  }

  completeTask(id) {
    this.setState(oldState => {
      const { tasks } = oldState;
      return ({
        tasks: tasks.map(i => {
          if (i._id === id) {
            const readyObject = i;
            readyObject.completed = !i.completed;
            return readyObject;
          }
          else return i;
        })
      });
    });
  }

  addTask({ id, text, date }) {
    this.setState(oldState => {
      const { tasks } = oldState;
      tasks[tasks.length] = { _id: id, name: text, completed: false, date: date };
      return ({ tasks });
    });
  }

  getDate(date) {
    this.setState({ dateForTask: date });
    this.openCalendar();
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <taskContext.Provider value={{
          loaded: this.state.loaded,
          tasks: this.state.tasks,
          removeTask: this.removeTask,
          addTask: this.addTask,
          completeTask: this.completeTask,
          renderTasks: this.renderTasks,
          dateForTask: this.state.dateForTask,
          isCalendarOpen: this.state.isCalendarOpen,
          openCalendar: this.openCalendar,
          currentDate: this.state.currentDate,
          changeCurrentDate: this.changeCurrentDate
        }}>

          <Wrapper >
            <ChooseDate />
            <h1>TODO</h1>
            <hr />
            <Input />
            <hr />
            <List />
            <Calendar getDate={this.getDate} isCalendarOpen={this.state.isCalendarOpen} style={ { top: '96px' , right: '115px' } }/>
          </Wrapper>
        </taskContext.Provider>
      </div>
    );
  }
}


export default App;
