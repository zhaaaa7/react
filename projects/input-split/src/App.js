import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './own/ValidationComponent';
import CharComponent from './own/CharComponent';



class App extends Component {
  state={
    inputLength:0,
    inputValue:'',
  };

  onChangeHandler=(event)=>{
    this.setState({
      inputLength:event.target.value.length,
      inputValue:event.target.value,
    });
  }

  deleteValueHandler=(index)=>{
    const inputValue=this.state.inputValue.split('');
    inputValue.splice(index,1);
    const newValue=inputValue.join('');
    this.setState({inputValue:newValue});
  }




  render() {
      // const box=this.state.inputValue.split('').map((char,index)=>{
      //       return <CharComponent
      //         key={index}
      //         value={char}
      //         click={()=>this.deleteValueHandler(index)}
      //       />;
      //     });


      const box=(
        <div>
        {
          this.state.inputValue.split('').map((char,index)=>{
            return <CharComponent
              key={index}
              value={char}
              click={()=>this.deleteValueHandler(index)}
            />;
          })
        }
        </div>
        );


    return (
      <div className="App">
        <input type="text" onChange={this.onChangeHandler} /> 
        {/* if the only argument is event, no arrow function is needed */}
        <p>{this.state.inputLength}</p>
        <ValidationComponent textLength={this.state.inputLength}/>
        {box}

      </div>
    );
  }
}

export default App;
