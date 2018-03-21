## Source:
Getting Started with Redux - Video Series

https://egghead.io/series/getting-started-with-redux

https://github.com/tayiorbeii/egghead.io_redux_course_notes


Building React Applications with Idiomatic Redux - Video Series

https://egghead.io/series/building-react-applications-with-idiomatic-redux

https://github.com/tayiorbeii/egghead.io_idiomatic_redux_course_notes

Docs: https://redux.js.org/introduction

## key sentence
Any change to state is caused by a store.dispatch() call somewhere in the component.

he todoApp reducer is the root reducer in this application. It is the one the store was created with, so its next state is the next state of the Redux store, and all the listeners(callbacks that have subscribed to the store) are notified.

It's best practice with React to have several components that don't specify any behaviors, and only are concerned with how things are rendered (how they look). These are called presentational components.
Because we want our list to be a presentational component, we "promote" the onClick handler to become a prop.
We also want to be more explicit about what the data is that the component needs to render. Instead of passing a todo object, we will pass completed and text fields as separate props.
```javascript
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration:
        completed ?
          'line-through' :
          'none'
    }}
  >
    {text}
  </li>
);
```
Now our Todo component is purely presentational. It doesn't specify any behavior, but it knows how to render a single todo item.

While presentational components just display data, we need a way to actually pass data from the store. This is where container components come in-- they can specify behavior and pass data.

injected store into TodoApp

```javascript
ReactDOM.render(
  <TodoApp store={createStore(todoApp)} />,
  document.getElementById('root')
);
```

Every container component needs a reference to store, and unfortunately the only way to make this happen (for now!) is by pass it down to every component as a prop:
```javascript
const TodoApp = ({ store }) => (
  <div>
    <AddTodo store={store} />
    <VisibleTodoList store={store} />
    <Footer store={store} />
  </div>
);
```
The containers subscribe to store and update like they did before. What changed is how they get the store.

pass it down as context:


Our container components are similar: they need to re-render when the store's state changes, they need to unsubscribe from the store when they unmount, and they take the current state from the Redux store and use it to render the presentational components with some props that they calculate.

### connect()
The result of the connect call is the container component that is going to render the presentational component. It will calculate the props to pass to the presentational component by merging the objects returned from mapStateToProps, mapDispatchToProps, and its own props

The connect() function will generate the component just like the one we wrote by hand, so we don't have to write the code to subscribe to the store or to specify the context types manually.

Why subscribe to the store if we aren't going to calculate props from the state? Because we don't need to subcribe to the store, we can call connect() without mapStateToProps as an argument, instead passing in null. What this does is tell connect that there is no need to subscribe to the store.
It's a common pattern to inject just the dispatch function, so if connect() sees that the second argument is null (or any falsey value), you'll get dispatch injected as a prop.

### action creator
Action creators are typically kept separate from components and reducers in order to help with maintainability


### initial state
When you create a Redux store, its initial state is determined by the root reducer.

Since reducers are autonomous, each of them specifies its own initial state as the default value of the state argument.

When passing in a persistedState, it will **overwrite** the default values set in the reducer as applicable.

the only way to get something into the state is to dispatch an action.

It's important that I destructure the filter right away, because by the time the callback fires, this.props.filter might have changed because the user might have navigated away.
https://github.com/tayiorbeii/egghead.io_idiomatic_redux_course_notes/blob/master/15-Dispatching_Actions_with_the_Fetched_Data.md

```javascript
fetchData() {
  const { filter, receiveTodos } = this.props;
  fetchTodos(filter).then(todos =>
    receiveTodos(filter, todos)
  );
}
```
### shorthand 
```javascript
const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));
```
When the arguments for the callback prop match the arguments to the action creator exactly, there is a shorter way to specify mapDispatchToProps.

Rather than pass a function, we can pass an object mapping of the names of the callback props that we want to inject and the action creator functions that create the corresponding actions.

This is a rather common case, so often you don't need to write mapDispatchToProps, and you can pass this map in object instead.

VisibleTodoList After:
```javascrip
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));
```


## Notes

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














1.  Redux works especially well with libraries like React and Deku because they let you describe UI as a function of state, and Redux emits state updates in response to actions.

2. Technically, a container component is just a React component that uses store.subscribe() to read a part of the Redux state tree and supply props to a presentational component it renders. 

3. Typically, you just need to generate container components with the React Redux library's connect() function, which provides many useful optimizations to prevent unnecessary re-renders. (One result of this is that you shouldn't have to worry about the React performance suggestion of implementing shouldComponentUpdate yourself.)


## concepts
1. 'dumb' component: A dumb component doesn't contain any business logic. It only specifies how the current state is rendered into output, and how the callbacks passed via props are bound to the event handlers.

The Counter component is a "dumb" component. 

```jsx
const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() =>
        store.dispatch({
          type: 'INCREMENT'
        })
      }
      onDecrement={() =>
        store.dispatch({
          type: 'DECREMENT'
        })
      }
    />,
    document.getElementById('root')
  );
}
```

2. reducer
The reducer specifies how the next state is calculated based on the current state and the action being dispatched.


3. filter and find the matched one 
```javascript
case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        } else {
// for the todo that matches the action id return all other information the same
// but change the completed property to the opposite of what it was previously
          return {
            ...todo,
            completed: !todo.completed
          };
        }
      });
```

4. reducer composition. Different reducers specify how different parts of the state tree are updated in response to actions. Since reducers are normal JS functions, they can call other reducers to delegate & abstract away updates to the state.
### Reducer Composition with arrays
in this new function that state refers to the individual todo, and not the list of todos.
```javascript
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)   //state is not needed here
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};
```
### Reducer Composition with Objects 

It is just a reducer that calls all other reducers. 

```javascript
const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return action.filter;
      default:
        return state;
    }
};

const todoApp = (state = {}, action) => {
  return {
     todos: todos(state.todos,action),
     visibilityFilter: visibilityFilter(state.visibilityFilter,action)
  };
};
```
It returns an object which will be assigned to the store. The object has two keys: todos and visibilityFilter. When the store is created, i.e store=createStore(todoApp), it gets a null '{}' action and 'indefined' state, so that each reducer receive undefined as state. As it is, todos reducer returns `[ ]` as the value of todos key, visibilityFilter returns 'SHOW_ALL' as the value of visibilityFilter key. 
So as soon as the store is created, the initial state of the whole store is set to 
```
{
todos: [],
visibilityFilter: 'SHOW_ALL'
}
```

5. comeReducer
```javascript
const { combineReducers } = Redux; // CDN Redux import

const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
```
```javascript
By convention, the state keys should be named after the reducers that manage them. Because of this, we can use ES6 object literal shorthand notation to accomplish the same thing like this:

const todoApp = combineReducers({
  todos,
  visibilityFilter
});
```
Since combineReducers() returns a reducer function, it must have the **signature** of a reducer function (the state and an action).

```javascript
const combineReducers = reducers => { // accepts an object of list of reducer key-value pairs
  return (state = {}, action) => {
    // Reduce all the keys for reducers from `todos` and `visibilityFilter`
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        // Call the corresponding reducer function for a given key, and a given part of the state
        nextState[key] = reducers[key] (state[key],action);
        return nextState;
      },
      {} // The `reduce` on our keys gradually fills this empty object until it is returned.
    );
  };
};
```

## react and redux
1. Any change to state is caused by a store.dispatch() call somewhere in the component.
```javascript
class TodoApp extends Component {
  render() {
    return (
      <div>
        <input ref={node => {
          this.input = node;
        }} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++
          });
          this.input.value = '';
        }}>
        Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    )
  };
}

const render = () => {
  ReactDOM.render(
    // Render the TodoApp Component to the <div> with id 'root'
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')

  )
};

store.subscribe(render);
render();
```

We start with the TodoApp component. This component isn't aware of how todos are being added, but what it can do is **express its desire to mutate the state** by dispatching an action with a type of 'ADD_TODO'.

it's equally important to be able to render the current state. The TodoApp component assumes that it will receive **todos as a prop**, and it maps the items to display a list, using the id as a key (see the <ul> section in TodoApp).

We render the TodoApp component inside the **render()** function that runs any time the state changes (as well as when the app is initilized.) The render() function reads the current state of the store and passes the array of todos to the TodoApp component as a prop via the line <TodoApp todos={store.getState().todos} />.

The render() function is called every time there is a change to the store, so the todos prop is always **up to date**.

2. spread props object
```javascript
const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();
```

3. <Provider> component -- pass store down using react context
  
  
4. <connect> component -- make components able to read store (state, state) from props, not context
  
 
5. action creator -- work on action payloads


6. initial state

When you create a Redux store, its initial state is determined by the root reducer. However, sometimes we want to load data into the store synchronously before the application starts. For example, there may be Todos left from the previous session. Redux lets us pass a persistedState as the second argument to the createStore function:
```javascript
const persistedState = {
  todos: [{
    id: 0,
    text: 'Welcome Back!',
    completed: false
  }]
}

const store = createStore(
  todoApp,
  persistedState
)
```
It may be tempting to supply an initial state for your entire store inside of persistedState, but it is not recommended. If you were to do this, it would become more difficult to test and change your reducers later.

7. local storage  

8. router


9. selector -- put them in the file which determines the argument it use


10. wrap dispatch()
10-1. to log state


10-2. to recognize promise


11. middleware chain

12. loading signifier

13. thunk middleware -- pass store.dispatch to an action that needs it
thunk: function returned by another function
```javascript
export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};
```

14. Normalizing API Responses
