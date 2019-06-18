import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import Wedding from './components'

class App extends Component {
  render() {
    return (
      <Wedding/>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
