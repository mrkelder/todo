import React, { Component } from 'react'
import Task from './task/Task';
import { taskContext } from '../../Context';

export class List extends Component {
  static contextType = taskContext;
  render() {
    return (
      <ul className="list-group">
        { this.context.tasks.map(i => <Task task={i} key={i._id}/>) }
      </ul>
    )
  }
}

export default List;
