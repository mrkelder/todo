import React, { Component } from 'react';
import Wrapper from './components/wrapper/Wrapper';
import Input from './components/input/Input';
import List from './components/list/List';
import { taskContext } from './Context';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [{ _id: 1, name: 'Walk the dog', completed: false }, { _id: 2, name: 'Wash the dishes', completed: false }]
    }
    this.removeTask = this.removeTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
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

  addTask(text) {
    this.setState(oldState => {
      const { tasks } = oldState;
      tasks[tasks.length] = { _id: ++tasks.length, name: text, completed: false };
      return ({ tasks });
    });
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <taskContext.Provider value={{ tasks: this.state.tasks, removeTask: this.removeTask, addTask: this.addTask, completeTask: this.completeTask }}>
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
