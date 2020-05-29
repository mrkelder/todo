import React, { Component } from 'react';
import Wrapper from './components/wrapper/Wrapper';
import Input from './components/input/Input';
import List from './components/list/List';
import axios from 'axios';
import { taskContext } from './Context';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: undefined,
      loaded: false
    }
    this.removeTask = this.removeTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
  }

  componentDidMount() {
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

  addTask({ id, text }) {
    this.setState(oldState => {
      const { tasks } = oldState;
      tasks[tasks.length] = { _id: id, name: text, completed: false };
      return ({ tasks });
    });
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <taskContext.Provider value={{ loaded: this.state.loaded, tasks: this.state.tasks, removeTask: this.removeTask, addTask: this.addTask, completeTask: this.completeTask }}>
          <Wrapper >
            <h1>TODO</h1>
            <hr />
            <Input />
            <hr />
            <List />
          </Wrapper>
        </taskContext.Provider>
      </div>
    );
  }
}


export default App;
