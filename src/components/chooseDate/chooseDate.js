import React, { Component } from 'react';
import Calendar from '../calendar/Calendar';
import { taskContext } from '../../Context';

export class chooseDate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCalendarOpen: false
    };


    this.getDate = this.getDate.bind(this);
  }

  getDate(date) {
    this.context.changeCurrentDate(date);
    this.setState({ isCalendarOpen: false });
  }

  static contextType = taskContext;
  render() {
    return (
      <div style={{ position: 'absolute', top: '-40px', left: 0 }}>
        <button className="btn btn-dark" onClick={() => {
          this.setState(state => ({ isCalendarOpen: !state.isCalendarOpen }));
          if(this.context.isCalendarOpen) this.context.openCalendar();
        }}>Выбрать дату</button>
        <Calendar style={{ top: 0, left: '124px' }} getDate={this.getDate} isCalendarOpen={this.state.isCalendarOpen} />
      </div>
    )
  }
}

export default chooseDate;
