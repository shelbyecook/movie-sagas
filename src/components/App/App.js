import React, { Component } from 'react';
import './App.css';
import Home from '../Home';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Home />
        <p>Empty Page</p>
      </div>
    );
  }
}

export default App;
