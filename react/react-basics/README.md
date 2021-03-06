## demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/x3oQXTP8WYk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


## setup
1. concepts: 
* dependency management tools: npm /yarn 
* dependency: third-party library (react, npm, yarn)
* bundler: bundle all modules (webpack)
* compiler: babel. (Babel is a Node package that developers use to transpile ES6+ code to ES5.)
2. process
* Download node.js to run npm
* run create-react-app, https://github.com/facebook/create-react-app
3. files
```
* package.json
```
It provides information about the JavaScript project: metadata (title, description), package dependencies, scripts, and more.
    
* What does the npm run build command do?

It runs a script assigned to "build" inside of package.json. If you assign it babel src -d lib, it will run the code required to transpile ES6+ code to ES5.

## single page application
There should be just 1 html page in one react project.

## react concepts:

1. jsx 

JSX is js in the end. it is a syntactic sugar for nested React.createElement.

```javascript
return (<div className="App"> <h1>hello world</h1></div>);
====>
return React.createElement('div',{className:'App'},React.createElement('h1',null,'hello world'));
```   
Wrap js code using {} in jsx
```javascript
<div className="Person" style={style}>
```

2. props

Allow you to pass data from a parent (wrapping) component to a child (embedded) component.

Attributes of the user-defined component instances are passed to the user-written code as the one argument: props. 

props.children let you pass the 'text' between the opening and closing tags of the component.

You can pass method reference also as props to avoid too much stateful components.
```javascript
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
Arrow function ensures "this" refers to the component.
Update, not mutate the state. setState() will merge the new state into the old one: compare and update what is changed.

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
* Import css file
```javascript
import './Person.css';
```

* Inline style, pay attention to property name and '', wrap properties in “” because they are in essence object property value

```jsx
//an object literal is being injected into JSX.
<div style={{ background: 'blue' }}></div>
```
```jsx
{ marginTop: 10 } // no pixel needed
```

```javascript
const style={
      backgroundColor:'green',
      font:'inherit',
      border:'1px solid blue',
      padding:'10px',
      cursor:'pointer',
      }
    };
<button style={style}> Submit </button>
```
* Dynamic styling
```javascript
if(this.state.showPersons){
        .......
        style.backgroundColor='red'; //dynamically change the style
    }
```
```javascript
let classGroup=[];
    if (this.state.persons.length<=2){
        classGroup.push('red');
    }
    if (this.state.persons.length<=1){
      classGroup.push('bold');
    }
<p className={classGroup.join(' ')}>dynamically changed css</p>
```

* More options with radium package --sudo class and media query
[radium](https://github.com/FormidableLabs/radium)

```
npm install --save redium

import Radium , {StyleRoot} from 'radium';

......

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
    
......

export default Radium(App);
```
```javascript
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
        
const style={
    '@media (min-width:800px)':{
      backgroundColor:'red'
    }
    
style[':hover']={
            backgroundColor:'black',
            color:'white'
        }
```

6. conditional rendering
* Inside jsx tenary expression
```javascript
{this.state.show ? <div>...</div> : null}
```
* Before render
```javascript
let person=null;
if(this.state.showPersons){
    person=(<div>...</div> );
}
 ```
 
 7. display a list of components
 ```javascript
 person=(<div>
        {this.state.persons.map((person,index)=>{
            return <Person
            key={person.id}
            click={()=>this.deletePersonHandler(index)} //should be a function expression
            name={person.name}
            age={person.age}           
            changed={(event)=>this.nameChangedHandler(event,person.id)}
            />
        })}
        </div> 
      );
  ```
'key' property is required to make the render proecess more efficient: react track each list item here. It should be placed on the outermost component in map function.

7. event handler
in App.js
```jsx
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

.
.
.
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
        
        
```

in Person.js
```jsx
return (
    <div className="Person" style={style}>
      <p onClick={props.click}> I'm {props.name} and I am {props.age} years old</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name}/>

    </div>

    )
```

event handler should be a function expression. to pass down the arguments, wrap the function in a higer order function. React will pass the event object as the last argument is you don't explicitly pass it. The process of passing the arguments is **from UI up to inside of component**: `<input onChange>` pass event to `<Person changed>`, `<Person changed>` pass event, person.id to the nameChangedHandler method.

  
## Some tips

1. Your app state should be manipulate in just a few .js file (container component) that do not do too much UI stuff, i.e. jsx code. Create as many as functional components which present sth, i.e. jsx.

2. event.target.value: handle user input

3. In order for a stateless child component to update the state of its parent, a parent must define a function that contains this.setState(). You can think of stateless components inheriting from stateful components.

4. MVC modal 
* A stateful component class stores information as state.
* A stateless component class displays that state.
* A different stateless component class displays a way to change that state.
