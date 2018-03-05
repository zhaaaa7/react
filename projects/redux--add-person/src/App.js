import React, { Component } from 'react';

import Persons from './containers/Persons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2 style={{textAlign:'center'}}>
          Add new person!
        </h2>
        <Persons />
      </div>
    );
  }
}

export default App;
