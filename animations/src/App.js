import React, { Component } from "react";
import Transition from 'react-transition-group/Transition';

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {

  state={
    modalIsOpen:false,
    showBlock:false
  }

  showModal=()=>{
    this.setState({modalIsOpen:true});
    console.log('show modal',this.state.modalIsOpen);
  }

  closeModal=()=>{
    this.setState({modalIsOpen:false});
    console.log('close modal',this.state.modalIsOpen);
  }

  render() {

   
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={()=>
        this.setState(preState=>({showBlock:!preState.showBlock}))}>Toggle to see transition</button>
        <br />
        {/* {this.state.showBlock?<div style={{
          backgroundColor:'red',
          width:100,
          height:100,
          margin:'auto'
        }}></div>:null} */}
        <Transition 
          in={this.state.showBlock} 
          timeout={300}
          mountOnEnter
          unmountOnExit>
        {
          state=>(
            <div style={{
              backgroundColor:'red',
              width:100,
              height:100,
              margin:'auto',
              transition:'opacity 1s ease-out',
              opacity:state==='exiting'?0:1
            }}></div>
          )
        }
        
        </Transition >


        
        <Modal closed={this.closeModal} show={this.state.modalIsOpen}/>
        {this.state.modalIsOpen?<Backdrop show={this.state.modalIsOpen}/>:null}
        <button className="Button" onClick={this.showModal}>Click to Open Modal!!</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
