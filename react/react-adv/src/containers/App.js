import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
//import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit'
import WithClass from '../hoc/WithClass';

class App extends Component {
   //test constructor()
    constructor(props){
      super(props);
      console.log("[App.js] Inside Constructor", props);
      this.state={
        persons:[
          {id:'good',name:'shijie', age:28},
          {id:'bad',name:'muli', age:18},
          {id:'excellent',name:'judy', age:220},
        ],
        showPersons:false,
        toggleCount:0
      };
    }
  
    componentWillMount(){
        console.log("[App.js] Inside componentWillMount");
    }

    componentDidMount(){
        console.log("[App.js] Inside componentDidMount");
    }

    deletePersonHandler=(personIndex)=>{
        const persons=[...this.state.persons]; //make a copy of the array
        persons.splice(personIndex,1);
        this.setState({persons:persons});
    }

    nameChangedHandler=(event,id)=>{
        const personIndex=this.state.persons.findIndex(p=>{
          return p.id===id;
        });
        const person={...this.state.persons[personIndex]}
        person.name=event.target.value;
        const persons=[...this.state.persons];
        persons[personIndex]=person;
        this.setState({persons:persons});
    }

    togglePersonsHandler=()=>{
        const doesShow=this.state.showPersons;
        //this.setState({showPersons:!doesShow});
        this.setState((prevState,props)=>{
          return{
            showPersons:!doesShow,
            toggleCount:prevState.toggleCount+1
          };
        });
      }

    render() {
        console.log('[App.js] Inside render');
        let persons=null;
        if(this.state.showPersons){
            persons=(
              <Persons 
              
              persons={this.state.persons}
              clicked={this.deletePersonHandler}
              changed={this.nameChangedHandler}
              />);
        }
      
        return (
          <WithClass className={classes.App}>
            <Cockpit 
                title={this.props.title}
                showPersons={this.state.showPersons} 
                toggled={this.togglePersonsHandler}
            />       
            {persons}
            </WithClass>
        );
    }
}

export default App;
