import React, { Component } from 'react'
import './wrapper.css';

export class Wrapper extends Component {
  render() {
    return (
      <div id="wrapper" className="rounded" ref={'aaa'}>
        {this.props.children}
      </div>
    )
  }
}

export default Wrapper
