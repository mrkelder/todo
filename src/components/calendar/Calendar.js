import React, { Component } from 'react';
import { taskContext } from '../../Context';
import './calendar.css';

export class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      months: [
        { name: 'Январь', id: 0 },
        { name: 'Февраль', id: 1 },
        { name: 'Март', id: 2 },
        { name: 'Апрель', id: 3 },
        { name: 'Май', id: 4 },
        { name: 'Июнь', id: 5 },
        { name: 'Июль', id: 6 },
        { name: 'Август', id: 7 },
        { name: 'Сентябрь', id: 8 },
        { name: 'Октябрь', id: 9 },
        { name: 'Ноябрь', id: 10 },
        { name: 'Декабрь', id: 11 },
      ],
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      showMonthList: false,
      showDayList: true
    }
    this.chooseDate = this.chooseDate.bind(this);
    this.chooseMonth = this.chooseMonth.bind(this);
    this.renderDate = this.renderDate.bind(this);
    this.renderMonth = this.renderMonth.bind(this);
    this.rightArrow = this.rightArrow.bind(this);
    this.leftArrow = this.leftArrow.bind(this);
    this.renderTotalDate = this.renderTotalDate.bind(this);
    this.chooseReadyDate = this.chooseReadyDate.bind(this);
  }

  componentDidMount() {
    document.getElementsByClassName('dateButton')[this.state.date - 1].style.backgroundColor = '#007bff';
    document.getElementsByClassName('dateButton')[this.state.date - 1].style.color = 'white';
  }

  chooseReadyDate(e) {
    const date = new Date(e.target.getAttribute('data-date'));
    this.setState({
      month: date.getMonth(),
      year: date.getFullYear(),
      date: date.getDate()
    }, () => {
      this.renderTotalDate();
      this.chooseDate({ target: document.getElementsByClassName('dateButton')[this.state.date - 1] });
    });
  }

  leftArrow() {
    if (this.state.month - 1 === -1) {
      this.setState(state => ({ month: state.months[state.months.length - 1].id, year: --state.year }), () => {
        this.chooseMonth(this.state.month);
      });
    }
    else {
      this.setState(state => ({ month: --state.month }), () => {
        this.chooseMonth(this.state.month);
      });
    }
  }

  rightArrow() {
    if (this.state.month + 1 === this.state.months.length) {
      this.setState(state => ({ month: state.months[0].id, year: ++state.year }), () => {
        this.chooseMonth(this.state.month);
      });
    }
    else {
      this.setState(state => ({ month: ++state.month }), () => {
        this.chooseMonth(this.state.month);
      });
    }
  }

  renderDate(element, index) {
    return (<td key={index}><button className="dateButton" onClick={this.chooseDate}>{element}</button></td>);
  }

  renderMonth(element, index) {
    return (<td key={index}><button data-month={element.id} onClick={this.chooseMonth}>{element.name}</button></td>);
  }

  chooseDate(e) {
    // Picks the date
    if (e.target.style.backgroundColor.length === 0 || e.target.style.backgroundColor === 'white') {
      for (let i of document.getElementsByClassName('dateButton')) {
        i.style.backgroundColor = 'white';
        i.style.color = 'black';
      }
      this.setState({ date: Number(e.target.innerText) }, () => {
        document.getElementsByClassName('dateButton')[this.state.date - 1].style.backgroundColor = '#007bff';
        document.getElementsByClassName('dateButton')[this.state.date - 1].style.color = 'white';
      });
    }
    else {
      e.target.style.backgroundColor = 'white';
      e.target.style.color = 'black';
    }
  }

  chooseMonth(e) {
    let id = isNaN(Number(e)) ? Number(e.target.getAttribute('data-month')) : e;

    this.setState({ showMonthList: false, showDayList: true, month: id }, () => {
      const dateButtons = [];
      for (let i of document.getElementsByClassName('dateButton')) {
        dateButtons.push(i)
      }
      if (id === 1) dateButtons.slice(-2).forEach(i => i.style.display = 'none');
      else if (id % 2 === 1) dateButtons[dateButtons.length - 1].style.display = 'none';
      else dateButtons.slice(-2).forEach(i => i.style.display = 'block');
    });
  }

  renderTotalDate() {
    this.props.getDate(new Date(String(this.state.year), String(this.state.month), String(this.state.date)));
  }

  static contextType = taskContext;
  render() {
    return (
      <div className="calendar" style={Object.assign(this.props.isCalendarOpen ? { display: 'block' } : { display: 'none' }, this.props.style)}>
        <div className="calendarBar">
          <div className="month">
            <span onClick={() => { this.setState(state => ({ showMonthList: !state.showMonthList, showDayList: !state.showDayList })) }}>{this.state.months[this.state.month].name}</span>
            <svg onClick={() => { this.setState(state => ({ showMonthList: !state.showMonthList, showDayList: !state.showDayList })) }} className="bi bi-triangle-fil triangle" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" />
            </svg>
          </div>
          <div className="year">{this.state.year}</div>
          <svg onClick={this.leftArrow} className="bi bi-arrow-left-short arrows" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M7.854 4.646a.5.5 0 0 1 0 .708L5.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
            <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h6.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
          </svg>
          <svg onClick={this.rightArrow} className="bi bi-arrow-right-short arrows" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.793 8 8.146 5.354a.5.5 0 0 1 0-.708z" />
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5H11a.5.5 0 0 1 0 1H4.5A.5.5 0 0 1 4 8z" />
          </svg>
        </div>
        {this.state.showDayList &&
          <ul className="options">
            {[{
              name: 'Завтра', date: () => {
                const currentDate = new Date(this.context.currentDate);
                const tomorrow = new Date(currentDate);
                tomorrow.setDate(tomorrow.getDate() + 1);
                return tomorrow;
              }
            },
            {
              name: 'Следующий понедельник', date: () => {
                let currentDate = new Date(this.context.currentDate);
                if (currentDate.getDay() === 0) currentDate.setDate(currentDate.getDate() + 1);

                while (currentDate.getDay() !== 0) {
                  currentDate.setDate(currentDate.getDate() + 1);
                }
                currentDate.setDate(currentDate.getDate() + 1);

                return currentDate;
              }
            },
            { name: 'Сегодня', date: () => new Date() }].map((i, index) => <li onClick={this.chooseReadyDate} data-date={i.date()} key={index}>{i.name}</li>)}
          </ul>
        }
        {
          this.state.showDayList && <table className="table">
            <tbody>
              <tr>
                {[1, 2, 3, 4, 5, 6, 7].map(this.renderDate)}
              </tr>
              <tr>
                {[8, 9, 10, 11, 12, 13, 14].map(this.renderDate)}
              </tr>
              <tr>
                {[15, 16, 17, 18, 19, 20, 21].map(this.renderDate)}
              </tr>
              <tr>
                {[22, 23, 24, 25, 26, 27, 28].map(this.renderDate)}
              </tr>
              <tr>
                {[29, 30, 31].map(this.renderDate)}
              </tr>
            </tbody>
          </table>
        }
        {this.state.showMonthList &&
          <table className="table tableMonth">
            <tbody>
              <tr>
                {this.state.months.slice(0, 4).map(this.renderMonth)}
              </tr>
              <tr>
                {this.state.months.slice(4, 8).map(this.renderMonth)}
              </tr>
              <tr>
                {this.state.months.slice(8, 12).map(this.renderMonth)}
              </tr>
            </tbody>
          </table>
        }
        <button className="btn btn-success" onClick={this.renderTotalDate}>Add</button>
      </div>
    )
  }
}

export default Calendar;
