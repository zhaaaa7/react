import React, { Component } from 'react';
import './AddPerson.css';

class addPerson extends Component{
    //local UI state
    state={
        name:'',
        age:''
    };

    //two way binding
    nameChangedHandler=(event)=>{
        this.setState({name:event.target.value});
    }

    ageChangedHandler=(event)=>{
        this.setState({age:event.target.value});
    }
    render(){
        return(
            <div className="AddPerson">
            <input type="text" placeholder="name" onChange={this.nameChangedHandler} value={this.state.name}/>
            <input type="number" placeholder="age" onChange={this.ageChangedHandler} value={this.state.age}/>
            <button onClick={()=>this.props.personAdded(this.state.name,this.state.age)}>Add Person</button>
        </div>
        );
    }
}
    


export default addPerson;