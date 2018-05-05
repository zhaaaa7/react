import React, { Component } from 'react';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import wrapClass from '../../../hoc/wrapClass';
import PropTypes from 'prop-types';

class Person extends Component{

    componentDidMount(){
        if(this.props.position===0){
          this.inputElement.focus();
        }      
    }

    render(){
      return (
        <Aux>
        {/* <div className={classes.Person} > */}
          <p onClick={this.props.click}> I'm {this.props.name} and I am {this.props.age} years old</p>
          <p>{this.props.children}</p>
          <input 
              ref={(inp)=>{this.inputElement=inp}}
              type="text" 
              onChange={this.props.changed} 
              value={this.props.name}
          />        
        </Aux>
        );
    }
}
  
Person.propTypes={
  click:PropTypes.func,
  name:PropTypes.string,
  age:PropTypes.number,
  changed:PropTypes.func
};

export default wrapClass(Person,classes.Person);
