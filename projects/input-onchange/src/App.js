import React, { Component } from 'react';
import UserInput from './own/UserInput';
import UserOutput from './own/UserOutput';
import './own/user.css';

class App extends Component {
  state={
    name:"shijie in state"
  };

  changeNameHandler=(event)=>{
    this.setState({
      name:event.target.value
    });
  }

  render() {
    const style={
      color:'red',
    };
    return (
      <div className="User">
        <UserInput changed={this.changeNameHandler} username={this.state.name} />
        <UserOutput style={style} username="shijie" />
        <UserOutput username={this.state.name}/>
        <UserOutput username="shijie not changed"  />
      </div>
    );
  }
}

export default App;
