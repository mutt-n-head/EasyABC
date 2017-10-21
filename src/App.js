import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EasyABC from './EasyABC';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Easy ABC</h1>
        </header>
        <EasyABC />
      </div>
    );
  }
}

export default App;
