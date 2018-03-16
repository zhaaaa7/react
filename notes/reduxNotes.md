
1. This complexity is difficult to handle as we're mixing two concepts that are very hard for the human mind to reason about: mutation and asynchronicity. 
2. Libraries like React attempt to solve this problem in the view layer by removing both asynchrony and direct DOM manipulation.
3. However, managing the state of your data is left up to you. This is where Redux enters. Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen. 
## reducer
* The reducer is a pure function that takes the previous state and an action, and returns the next state.
* reducer must be pure
* you need to teach it to understand the actions we defined
* immutability
https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/05-Avoiding_Array_Mutations.md

### combineReducer
```javascript
const combineReducers = reducers => {
  return (state = {}, action) => {

    // Reduce all the keys for reducers from `todos` and `visibilityFilter`
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        // Call the corresponding reducer function for a given key
        nextState[key] = reducers[key] (
          state[key],
          action
        );
        return nextState;
      },
      {} // The `reduce` on our keys gradually fills this empty object until it is returned.
    );
  };
};
```
### initial state
1. the second argument in createStore() is the initial state. If not provided, i.e. undefined, the default value in each reducer will work.
2. persisting the initial state in local storage
use uuid package to avoid key collision
```
$ npm install --save node-uuid
```
```
stringify() is expensive
```

### selectors -- We usually call these functions selectors because they select something from the current state.
https://github.com/tayiorbeii/egghead.io_idiomatic_redux_course_notes/blob/master/10-Colocating_Selectors_with_Reducers.md

```javascript
export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter(t => t.completed);
    case 'active':
      return state.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
```


## store
1.subscribe() registers a callback that the redux store will call any time an **action has been dispatched** so you can update the UI of your application to reflect the current application state
```javascript
const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render(); // calling once to render the initial state (0), then the subscribe will update subsequently

document.addEventListener('click', () => {
    store.dispatch({ type : 'INCREMENT' })
});
```
2. what's inside a createStore?

https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/03-Implementing_Store_from_Scratch.md


```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({}); // dummy dispatch

  return { getState, dispatch, subscribe };

};
```

### connect()
1. connect () works to pass the store down, it also does the subscribe and unsubscribe stuff for you.



## action

### action creator
use arrow function: if there is only one return statement, omit the {}, if the returned one is an object, wrap it in () so the parser understands it is an (object) expression, not a block.
```javascript
export const addTodo = (text) => ({
  type:'ADD_TODO',
  id: (nextTodoId++).toString(),
  text,
})
```

use concise method notation
```javascrip
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick() {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
})
```











notes of https://redux.js.org/basics/usage-with-react


1.  Redux works especially well with libraries like React and Deku because they let you describe UI as a function of state, and Redux emits state updates in response to actions.

2. Technically, a container component is just a React component that uses store.subscribe() to read a part of the Redux state tree and supply props to a presentational component it renders. 

3. Typically, you just need to generate container components with the React Redux library's connect() function, which provides many useful optimizations to prevent unnecessary re-renders. (One result of this is that you shouldn't have to worry about the React performance suggestion of implementing shouldComponentUpdate yourself.)

