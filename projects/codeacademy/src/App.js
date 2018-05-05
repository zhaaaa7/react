import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Contact from './quizz/auth';
import Random from './quizz/color-picker/random-color'
import Vid from './quizz/video-player/Vid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Contact />
        <Random />
        <Vid />
      </div>
    );
  }
}

export default App;
