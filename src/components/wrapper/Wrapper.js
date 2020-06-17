import React, { Component } from 'react'
import './wrapper.css';

export class Wrapper extends Component {
  render() {
    return (
      <div id="wrapper" className="rounded">
        {this.props.children}
      </div >
    )
  }
}

export default Wrapper
