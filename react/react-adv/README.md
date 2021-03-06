## demo: 
https://react-2f3e7.firebaseapp.com


<iframe width="560" height="315" src="https://www.youtube.com/embed/hVxJPakKjWs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## css module

To scope the css file to each component, not globally.https://github.com/gajus/react-css-modules. Webpack makes it possible to import css into js file

### Set Up

More Details: https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2

1. eject 
```
npm run ejct
```
2. change css loader in webpack.config.dev.js
```javascript
{
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'

      },
    },
    ....
}
```
and webpack.config.prod.js
```javascript
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              minimize: true,
              sourceMap: shouldUseSourceMap,
            },
          },
          .....
}
```
Behind the scene, the css loader append 'local__hash:base64:5' to each css seletor to make it unique.

### Usage

css file
```css
.App {
  text-align: center;
}
```
js file
```javascript
import classes from './App.css';

<div className={classes.App}>
```
in the browser
```css
<div class="App__App__2NQx7">
```
to define a global styling rule
```css
:global .App { ... }
```
```javascript
<div className="App">
```
## Debugging
1. react-dev-tool https://github.com/facebook/react-devtools
2. error boundary component ( react 16) https://reactjs.org/docs/error-boundaries.html

componentDidCatch() lifecycle method, put it somewhere you know error may happen but you can't control it.
```javascript
class ErrorBoundary extends Component{
    state={
        hasError:false,
        errorMessage:''
    }

    componentDidCatch=(error,info)=>{
        this.setState(
            {
                hasError:true,
                errorMessage:error
            }
        );
    }

    render(){
        if(this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>;
        }else{
            return this.props.children;
        }
        
    }    
}
```
## react concepts
1. stateful(class) and stateless(function) components. Use stateful components as little as possible.
2. setState() 

1)this.setState automatically calls render, so don't use it in render, otherwise it would create an infinite loop

2)is async, it calls the render() but not synchronously, it just put the new state in the event queue. so use the functional form if wanting to use the previous state, such us counting. 

```javascript
this.setState((prevState,props)=>{
    return{
      showPersons:!doesShow,
      toggleCount:prevState.toggleCount+1
    };
});
```
3. component lifecycle https://reactjs.org/docs/state-and-lifecycle.html

Don't update state (setState) in componentDidMount().

The best lifecycle to use setState() is componentShouldUpdate(), you return true or false to decide whether to continue the update process, it can save the unnecessary effort of rebuilding the DOM. For example, a component to be animated is, for the most of the time, out of the screen. You can update the state only when it appears in the viewpoint.

These methods will never called through DOM events, so no 'this' keyword issue.

4. PureComponent https://reactjs.org/docs/react-api.html#reactpurecomponent

setState() will cause the re-rendering even if there is nothing changed, i.e always the setting the same value. So you need to use componentShouldUpdate() in children components to check 

```
if (nextProps.xxx===this.props.xxx, nextState.xxx===this.State.xxx)
```

Here, PureComponent has built-in componentShouldUpdate() check rules. Children components will benefit from the parent PureComponent.

5. virtual DOM https://reactjs.org/docs/faq-internals.html, render() changes the virtual DOM, not the real DOM.

How does virtual DOm work?
```
a. A JSX element renders.
b. The entire virtual DOM updates.
c. The virtual DOM "diffs," comparing its current self with its previous self.
d. Part of the real DOM updates.
e. The screen looks different than it used to.
```

6. higher order component https://reactjs.org/docs/higher-order-components.html

* type 1 -- return props.children

props.children returns everything between a component's opening and closing tags.

```javascript
const aux=(props)=>props.children;
export default aux;
```
wrap the jsx with Aux to avoid meaningless div

```javascript
//avoid using unnecessary div
<Aux>
   <h2> {this.props.title} </h2>
    <button
        className={btnClass}
        onClick={this.props.toggled}>Show Name Card
    </button>
</Aux>
```
In react 16.2, there is built-in fragment
```jsx
<>
    <h1>First Element</h1>
    <h1>Second Element</h1>
</>
```
* type 2 -- return a component
``` javascript
import React from 'react';
const wrapClass=(WrappedComponent,className)=>{
    return(props)=>(
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    )
};

export default wrapClass;
```
```javascript
export default wrapClass(person,classes.Person);
```
7. type checking https://reactjs.org/docs/typechecking-with-proptypes.html

prop-types package. Each propType is a property on an object.
```
npm install --save prop-types
```
```javascript
import PropTypes from 'prop-types';
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}
Greeting.propTypes = {
  name: PropTypes.string
};
```
8. 'ref' keyword. https://reactjs.org/docs/refs-and-the-dom.html

ref creates a new property of the class

Used for focusing text input.

```jsx
componentDidMount(){
        if(this.props.position===0){
          this.inputElement.focus();
        }      
}
render(){
....
<input 
    ref={(inp)=>{this.inputElement=inp}}
    type="text" 
    onChange={this.props.changed} 
    value={this.props.name}
/>   
....
}
```
