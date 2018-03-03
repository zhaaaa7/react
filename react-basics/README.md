## setup
1. concepts: 
* dependency management tools: npm /yarn 
* dependency: third-party library (react, npm, yarn)
* bundler: bundle all modules (webpack)
* compiler: babel
2. process
* Download node.js to run npm
* https://github.com/facebook/create-react-app
    
    
## react concepts:

1. jsx 

JSX is js in the end. it is a syntactic sugar for nested React.createElement.

```
return (<div className="App"> <h1>hello world</h1></div>);
====>
return React.createElement('div',{className:'App'},React.createElement('h1',null,'hello world'));
```   
Wrap js code using {} in jsx
```
<div className="Person" style={style}>
```

2. props

Allow you to pass data from a parent (wrapping) component to a child (embedded) component.

Attributes of the user-defined component instances are passed to the user-written code as the one argument: props. 

props.children let you pass the 'text' between the opening and closing tags of the component.

You can pass method reference also as props to avoid too much stateful components.
```
return <Person
            click={()=>this.deletePersonHandler(index)} //can be inefficient
            click={this.deletePersonHandler.bind(this.index)} 
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event)=>this.nameChangedHandler(event,person.id)}
            />
```

3. state 

It is a reserved word in classes component.It is an object that manages component internal data and change the component from within. If changed, react will update the DOM. 

```javascript
state={
    persons:[
      {id:'good',name:'max', age:28},
      {id:'bad',name:'menu', age:18},
      {id:'excellent',name:'judy', age:220},
    ],
    showPersons:true
  };
```
```
<Person name={this.state.person[0].name} age={this.state.person[0].age}>hello</Person>
```
arrow function ensures "this" refers to the component.
Update, not mutate the state
setState() will merge the new state into the old one: compare and update what is changed.

4. two way binding
```javascript
nameChangedHandler=(event)=>{
    this.setState({person:[
        {name:'max', age:28},
        {name:event.target.value, age:18},
        {name:'judy', age:22},
   ]});
}

<input type="text" onChange={props.changed} value={props.name}/>

```
5. styling

The .css file is in gobal scope, so use the same as component to avoid mistakes.
Import css file
```
import './Person.css';
```

inline style
```
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
<button style={style}> Submit </button>
```

