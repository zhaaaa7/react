1. setup


   concepts:
   
   
    dependency  management tools: npm /yarn 
    
    
    dependency: third-party library (react, npm, yarn)
    
    
    bundler: bundle all modules (webpack)
    
    
    compiler: babel
    
    
   process
   
   
    Download node.js to run npm
    
    
    https://github.com/facebook/create-react-app
    
    

3. react concepts:


jsx is js in the end. it is a syntactic sugar for nested React.createElement.


return (<div className="App"> <h1>hello world</h1></div>);
====>
    return React.createElement('div',{className:'App'},React.createElement('h1',null,'hello world'));
    
    
Attributes of the user-defined component instances are passed to the user-written code as the one argument: props. Pass the text between the opening and closing tags of the component: props.children


Wrap js code using {} in jsx

state is a reserved word in classes component that “extends Component”, an object. if we want to manage component internal data.setState will merge the new state into the old one: compare and update what is changed

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
