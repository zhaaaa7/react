import React, { Component } from 'react';
import classes from './Cockpit.css';
import Aux from '../../hoc/Aux';

class Cockpit extends Component{
    render (){
        let btnClass=classes.Button;
        if(this.props.showPersons){
            btnClass=[classes.Button,classes.Red,].join(' ');;
        }
    
        return (
            <Aux>
               <h2> {this.props.title} </h2>
                <button
                    className={btnClass}
                    onClick={this.props.toggled}>Show Name Card
                </button>
            </Aux>
        );
    }
}
    


export default Cockpit;