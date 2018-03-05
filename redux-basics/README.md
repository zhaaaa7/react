## Concepts
1. Redux: has a clearly defined process of how the state of the app may change
2. store: a global store, a giant js object
3. action: a “messenger”, 
4. reducer: changes the state. It is just a pure, synchronous function which receives the old state and action as params and return updated state. 
5. work flow:
* A component “dispatches” an action
* Reducer check the type of action and then define a block code regarding that type of action. 
* Components subscribe to central storage store and then get the updated state as props.

## Set up
1. install packages
```
npm install -save redux react-redux
```
2. Connect redux to react
```javascript
createStore(rootreducer)
<Provider  store={store}><App /></Provider> //— a helper component
<connect>()(component) //— a function which returns a higher order function, subscribe to the store
```

## Details
1. Immutability
https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
For object
```javascript
newState=Object.assign({},state)
//or
return {
  
  …state,               
       }
```
For array, use concat, filter or other array methods that return a new array

2. Outsource action types in separate actiontype.js to avoid typo
3. Split reducers based on their task goal
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

4. What type of state should be controlled in redux?
Local UI state : often not
Persistent state: often in backend server, may store some related slices in redux
Client state: user authenticated? User preference? In redux!
