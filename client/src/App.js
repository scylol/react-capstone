import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Quiz from './components/quiz.js';

import Header from './components/header.js'

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />
       <Quiz />
      </div>
    );
  }
}

export default App;
