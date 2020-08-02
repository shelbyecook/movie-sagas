import React, { Component } from 'react';
import './App.css';
import Home from '../Home';
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
