import React, { Component, Fragment } from 'react'
import Task from './task/Task';
import { taskContext } from '../../Context';

export class List extends Component {
  static contextType = taskContext;
  render() {
    if (this.context.loaded === true) {
      if (this.context.tasks === undefined) return (
        <Fragment>
          <p style={{ padding: '0 10px' }}>Простите , мы не смогли подключиться к серверу</p>
          <button className="btn btn-primary" onClick={this.context.renderTasks}>Побробовать снова</button>
        </Fragment>
      );
      else if (this.context.tasks.length !== 0)
        return (
          <ul className="list-group">
            {this.context.tasks.map(i => <Task task={i} key={i._id} />)}
          </ul>
        );
      else return <p style={{ padding: '0 10px' }}>Задач пока нет</p>;

    }
    else {
      return <div className="spinner-border text-secondary" role="status"></div>;
    }
  }
}

export default List;
