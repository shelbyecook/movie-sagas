import React, { Component } from 'react';
import './App.css';
import Home from '../pages/Home';
import { HashRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
