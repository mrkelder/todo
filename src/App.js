import React, { Component } from 'react';
import Wrapper from './components/wrapper/Wrapper';
import Input from './components/input/Input';
import List from './components/list/List';
import { taskContext } from './Context';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [{ _id: 1, name: 'Walk the dog' }, { _id: 2, name: 'Wash the dishes' }]
    }
    this.removeTask = this.removeTask.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  removeTask(id) {
    this.setState(oldState => {
      const { tasks } = oldState;
      return ({
        tasks: tasks.filter(task => task._id !== id)
      });
    });
  }

  addTask(text) {
    this.setState(oldState => {
      const { tasks } = oldState;
      tasks[tasks.length] = {_id: ++tasks.length , name: text};
      return ({ tasks });
    });
  }

  render() {
    return (
      <div className="App" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <taskContext.Provider value={{ tasks: this.state.tasks, removeTask: this.removeTask, addTask: this.addTask }}>
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
