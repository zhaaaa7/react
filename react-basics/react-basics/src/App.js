import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium , {StyleRoot} from 'radium';

class App extends Component {
  state={
      persons:[
        {id:'good',name:'max', age:28},
        {id:'bad',name:'menu', age:18},
        {id:'excellent',name:'judy', age:220},
      ],
      showPersons:true
  };

 deletePersonHandler=(personIndex)=>{
    //make a copy of the array
    //const persons=this.state.person.slice();
    const persons=[...this.state.persons]; 
    persons.splice(personIndex,1);
    this.setState({persons:persons});
 }

nameChangedHandler=(event,id)=>{
    //find the one that receiving user input
    const personIndex=this.state.persons.findIndex(p=>{
        return p.id===id; //return ture or false
    });
    const person={...this.state.persons[personIndex]}
    person.name=event.target.value;
    const persons=[...this.state.persons];
    persons[personIndex]=person;
    this.setState({persons:persons});

}

togglePersonsHandler=()=>{
    const doesShow=this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }

  render() {
    const style={
        backgroundColor:'green',
        font:'inherit',
        border:'1px solid blue',
        padding:'10px',
        cursor:'pointer',
        ':hover':{
          backgroundColor:'lightgreen',
          color:'white'
        }
    };
    let person=null;
    if(this.state.showPersons){
        //this is js environment
        //save a jsx code block in person
        person=(<div>
            {this.state.persons.map((person,index)=>{
              return <Person
                click={()=>this.deletePersonHandler(index)} //should be a function expression
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event)=>this.nameChangedHandler(event,person.id)}
                />
            })}
            </div> 
        );
        style.backgroundColor='red'; //dynamically change the style
        style[':hover']={
            backgroundColor:'black',
            color:'white'
        }
    }

    //add the class to change the styling
    let classGroup=[];
    if (this.state.persons.length<=2){
        classGroup.push('red');
    }
    if (this.state.persons.length<=1){
      classGroup.push('bold');
    }

    return (
      <StyleRoot>
      <div className="App">
          <p className={classGroup.join(' ')}>dynamically changed css</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>See Name Card
          </button>
          {person}
      </div>
      </StyleRoot>
    );
    
  }
}

export default Radium(App);
