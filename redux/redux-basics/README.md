## demo: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/TV522fX97zY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


https://redux-b06c9.firebaseapp.com

## Concepts
1. Redux: has a clearly defined process of how the state of the app may change
2. store: a global store, a giant js object
3. action: a “messenger”, 
4. reducer: changes the state. It is just a pure, synchronous function which receives the old state and action as params and return updated state. 
5. work flow:
* A component “dispatches” an action
* Reducer check the type of action and then define a block code regarding that type of action. 
* Components subscribe to central storage store and then get the updated state as props.

6. `<Provider>` a helper component ejcting store into react component

7. `connect` is a function that returns higher order component

8. `combineReducers` is a helper function that mergers reducers


## Set up
1. install packages
```
npm install -save redux react-redux
```
2. Connect redux to react
In App.js

```jsx
Import {createStore} from ‘redux’;
Import reducer from './reducer.js';
Import {Provider} from ‘react-redux’;


createStore(rootreducer)

<Provider  store={store}><App /></Provider> //— a helper component

```
In individual container component
```jsx

import {connect} from “react-redux";

<connect>()(component) //— a function which returns a higher order function, subscribe to the store
```

## Details
1. props take over state and methods

All state and dispatch actions are saved in the props that use “this.props” for everything.
```javascript
const mapStateToProps=state=>{};

const mapDispatchToProps=dispatch=>{:
```

2. Immutability
https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
For object
```javascript
newState=Object.assign({},state)
//or
return {
  
  …state,               
       }
```
For array, use concat(), filter() or other array methods that return a new array

3. Outsource action types in separate actiontype.js to avoid typo
4. Split reducers based on their task goal
```javascript
rootReducer=combineReducers({ 
              reduceri1:xx, 
              reducer2: xx});
```
Remember to add the keys when mapping states to props
```javascript
const mapStateToProps=state=>{
    return {
        ctr:state.ctr.counter,  
        storedResults:state.res.results
    };
};
```

Each reducer can just access to the local state, not the state in other reducers. To get it, use the payload data.
```javascript
const mapDispatchToProps=dispatch=>{
    return {
    ........
    onStoreResult:(result)=>dispatch({type:actionType.STORE_RESULT,result:result}),
    }
}

//in result.js reducer
results:state.results.concat({id:new Date(),value:action.result}) 
```

5. What type of state should be controlled in redux?

Local UI state : often not

Persistent state: often in backend server, may store some related slices in redux

Client state: user authenticated? User preference? In redux!

## tricks
1. you can dispatch funcs that doesn’t handled by the reducer, because by default the state is returned
