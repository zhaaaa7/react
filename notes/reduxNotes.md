## Source:
Docs: 

https://redux.js.org/introduction

Getting Started with Redux - Video Series

https://egghead.io/series/getting-started-with-redux

https://github.com/tayiorbeii/egghead.io_redux_course_notes


Building React Applications with Idiomatic Redux - Video Series

https://egghead.io/series/building-react-applications-with-idiomatic-redux

https://github.com/tayiorbeii/egghead.io_idiomatic_redux_course_notes


## Why does redux exist?
1. The complexity is difficult to handle as we're mixing two concepts that are very hard for the human mind to reason about: mutation and asynchronicity. 
2. Libraries like React attempt to solve this problem in the view layer by removing both asynchrony and direct DOM manipulation.
3. However, managing the state of your data is left up to you. This is where Redux enters. Redux attempts to make state mutations predictable by imposing certain restrictions on how and when updates can happen.
4. Redux works especially well with libraries like React and Deku because they let you describe UI as a function of state, and Redux emits state updates in response to actions.


## foundamental concepts
<img src="https://github.com/zhaaaa7/react/blob/master/notes/redux.jpg" alt='redux' width="800px"/>

### createStore(reducer)
```javascript
const createStore = (reducer) => {
  let state;
  let listeners = [];
  
  // return state
  const getState = () => state;
  
  // update state with reducer, call each listener
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  
  // register listeners, return an unsubscribe method, 
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener); // const l=store.subscribe(listener1); l();
    }
  };

  dispatch({}); // dispatch a null action to initiate the store

  return { getState, dispatch, subscribe };

};
```

### reducer
The reducer specifies how the next state is calculated based on the current state and the action being dispatched.

* The reducer is a pure function that takes the previous state and an action, and returns the next state.
* reducer must be pure
* you need to teach it to understand the actions we defined
* immutability
https://github.com/tayiorbeii/egghead.io_redux_course_notes/blob/master/05-Avoiding_Array_Mutations.md

## subscribe
subscribe() registers a callback that the redux store will call any time an **action has been dispatched** so you can update the UI of your application to reflect the current application state
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

2. filter and find the matched one 
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

3. reducer composition. 

Different reducers specify how different parts of the state tree are updated in response to actions. Since reducers are normal JS functions, they can call other reducers to delegate & abstract away updates to the state.

##### Reducer Composition with arrays
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
##### Reducer Composition with Objects 

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

4. combineReducer
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

it's equally important to be able to render the current state. The TodoApp component assumes that it will receive **todos as a prop**, and it maps the items to display a list, using the id as a key (see the `<ul>` section in TodoApp).

We render the TodoApp component inside the **render()** function that runs any time the state changes (as well as when the app is initilized.) The render() function reads the current state of the store and passes the array of todos to the TodoApp component as a prop via the line <TodoApp todos={store.getState().todos} />.

The render() function is called every time there is a change to the store, so the todos prop is always **up to date**.

1-1. extracting container component
```javascript
class FilterLink extends Component {
  render () {
    const props = this.props;
    
    // this just reads the store, is not listening for change messages from the store updating
    const state = store.getState();

    return (
      <Link
        active={
          props.filter ===
          state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}
```
There is a small problem with this implementation of FilterLink. Inside the render() method it reads the current state of the Redux store, however it **does not subscribe to the store**. So if the parent component doesn't update when the store is updated, the correct value won't be rendered.

Also, we currently re-render the entire application when the state changes, which isn't very efficient.
```
store.subscribe(render);
```

React provides a special **forceUpdate()** method on the Component instances to force them to re-render. We can use it in combination with the store.subscribe() method, so that **any time the store changes we force the container component to update**.

```javascript
class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  // Since the subscription happens in `componentDidMount`, it's important to unsubscribe in `componentWillUnmount`.
  componentWillUnmount() {
    this.unsubscribe(); // return value of `store.subscribe()`
  }
  
  render(){
  .
  .
  .
  }
``` 
We can get rid of the render() function because the container components inside of TodoApp are now set up to get state and update themselves as needed, therefore, we only need to render TodoApp once on initialization.
```javascript
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

// Note this render does not belong to `TodoApp`
ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
```

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

3. pass store down 
3-1. with props
So far we've been creating a variable called store by passing our combined todoApp reducers into Redux's createStore() function:
```javascript
const store = createStore(todoApp);
ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
```
**Once the store has been created, our container components get data from it by calling store.getState(), subscribe to changes by calling store.subscribe(), and dispatch actions by calling store.dispatch()**.

Having all of our code in a single file works well for a simple example, but it doesn't scale very well.

First, it makes our components harder to test because they'll reference a specific store, but we may want to provide a different mock store in the tests.

Second, it makes it hard to implement Universal applications that are rendered on the server, because on the server we'll want to supply a different store instance for every request, because different requests have different data.

To start fixing this, we'll move the code related to creating the store to the bottom of the file, and pass the store we create as a prop to TodoApp.

```javascript
ReactDOM.render(
  <TodoApp store={createStore(todoApp)} />,
  document.getElementById('root')
);
```

Every container component needs a reference to store, and unfortunately the only way to make this happen (for now!) is by passing it down to every component as a prop. However, this is less effort than passing different data to every component, but not as good as what we'll have later.
```javascript
const TodoApp = ({ store }) => (
  <div>
    <AddTodo store={store} />
    <VisibleTodoList store={store} />
    <Footer store={store} />
  </div>
);
```
3-2. via Reatc context https://reactjs.org/docs/context.html
```javascript
class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store // This corresponds to the `store` passed in as a prop
    };
  }
  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: React.PropTypes.object
}


ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

```
Now the store will be available to any of the children and grandchildren of the components Provider renders.
```javascript
class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe=store.subscribe(()=>this.forceUpdate());
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();
    
    return (
      <TodoList
       todos={getVisibleTodos (state.todos,state.visibilityFilter)}
       onTodoClick=(id) => {store.dispatch({type: 'TOGGLE_TODO',id})}
       />
    );
  }
}
```


3-3. use `<Provider>` component -- pass store down using react context
```javascript
import { Provider } from 'react-redux';
```

4. `<connect>` component -- make components able to read store (state, state) from props, not context

Our container components are similar: they need to re-render when the store's state changes, they need to unsubscribe from the store when they unmount, and they take the current state from the Redux store and use it to render the presentational components with some props that they calculate.

They also need to specify the contextTypes to get the store from the context.

```javascript
const mapStateToProps = (state) => {
  return 
  {
    todos: getVisibleTodos (state.todos,state.visibilityFilter)
  };
}

const mapDispatchToProps = (dispatch) => {
  return 
  {
    onTodoClick: (id) => {dispatch({type: 'TOGGLE_TODO',id})}
  };
};
```

`connect` component will take care of the context, you can just use the state and dispatch from the store in the context

```javascript
import { connect } from 'react-redux';

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```
Now, you have a container component VisibleTodoList which renders the presentational component TodoList, passing the `todos` and `onTodoClick` as props.

5. action creator -- a function that returns an action object, give you a chance to work on action payloads
```javascript
let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  };
};

//use the action creator
<button onClick={() => {
  dispatch(addTodo(input.value))
  input.value = '';
}}>
```
If there is only one return statement, omit the {}, if the returned one is an object, wrap it in () so the **parser understands it is an (object) expression, not a block**.
```javascript
export const addTodo = (text) => ({
  type:'ADD_TODO',
  id: (nextTodoId++).toString(),
  text,
})
```


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
loadState.js
```javascript
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
```
saveState.js
```javascript
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
```
generate random id
```javascript
import { v4 } from 'node-uuid'

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})
```
preventing calling savaState too often,  guarantee that we only write to localStorage once a second at most.
```javascript
import throttle from 'lodash/throttle'
.
.
.
store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos
  })
}, 1000))

```

8. router


9. selector -- put them in the file which determines the argument it use

"We usually call these functions selectors because they select something from the current state."
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

10. wrap dispatch()
10-1. to log state

addLoggingToDispatch() function also returns a **function** with the same API as the original dispatch function, but it logs the action type, the previous state, the action, and the next state along the way.

```javascript
const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    const returnValue = rawDispatch(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}
```


10-2. to recognize promise
a Promise action
```javascript
export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response =>
    receiveTodos(filter, response)
  );
```
the new dispatch
```javascript
const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {  //if action is a Promise
      return action.then(rawDispatch);    //wait for it to resolve to a normal action object, and pass the returned action to the rawDispatch, and call it
    }
    return rawDispatch(action);    //call rawDispatch with the non-Promise, normal action
  };
};
```
in configure.js
```javascript
const configureStore = () => {
  const store = createStore(todoApp);

  if (process.env.NODE_ENV !== 'production') {    //use logging just in producetion environment
    store.dispatch = addLoggingToDispatch(store);  
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  return store;
};
```


11. middleware chain

We'll rename rawDispatch to next, because this is the next dispatch function in the chain. `next` refers to the store.dispatch that was returned from **addLoggingToDispatch()**.

```javascript
const addPromiseSupportToDispatch = (store) => {
  const next = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(next);
    }
    return next(action);
  };
};
```
For consistency, we will rename rawDispatch to next here as well. In this particular case, next points to the **original store.dispatch**.
```javascript
const addLoggingToDispatch = (store) => {
  const next = store.dispatch;
  if (!console.group) {
    return next;
  }

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);

    const returnValue = next(action);

    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};
```
#### middlewares array
This middlewares array will contain functions to be applied later as a single step.

Now we create a function wrapDispatchWithMiddlewares() that takes the store as the first argument, and the array of middlewares as the second.
```javascript
const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise];

   .
   .
   .
};
```

we will **override the store.dispatch function** to point to the result of calling the middleware with the store as an argument.
```javascript
const wrapDispatchWithMiddlewares = (store, middlewares) =>
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store);
  );
```
Recall that inside of our middleware functions themselves, there is a certain pattern that we have to repeat. We **grabbing the value of store.dispatch and store it in a variable called next that we call later**. To make it a part of the **middleware contract**, we can make next an outside argument, just like the store before it and the action after it.
```javascript
const logger = (store) => {
  return (next) => {
    if (!console.group) {
      return next;
    }

    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: blue', action);

      const returnValue = next(action);

      console.log('%c next state', 'color: green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    };
  }
};

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
}

```
#### where does next come from?
Our middlewares are currently specified in the order in which the dispatch function is overridden, but it would be more natural to specify the **order in which the action propagates through the middlewares**.
```javascript
const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  middlewares.push(push);
  
  wrapDispatchWithMiddlewares(store, middlewares)
  return store;
};

```

We will change our middleware declaration to specify them in the order in which the action travels through them. The `next` means the next item in the array.
```javascript
const configureStore = () => {
  const store = createStore(todoApp);
  const middlewares = [promise];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};
```
We will also wrapDispatchWithMiddlewares from right to left by cloning the past array then reversing it. So the `next` in each middleware refers to the returned new version of store.dispatch() in the middleware `after` it in the middlewares array.
```javascript
const wrapDispatchWithMiddlewares = (store, middlewares) =>
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });
```

12. use applyMiddleware

This last argument to createStore is called an enhancer, and it's optional. If you want to specify the persistedState, you need to do this before the enhancer (you can also skip the persistedState if you don't have it).

Many middlewares are available as **npm packages**. Both the promise and the logger middlewares that we wrote are no exceptions to this.

```javascript
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import todoApp from './reducers';

const configureStore = () => {
  const middlewares = [promise];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    todoApp,
    applyMiddleware(...middlewares)
  );
};

export default configureStore;
```
The second argument to createStore here will be the result of calling applyMiddleware with my middleware functions as positional arguments.



13. thunk middleware

thunk: function returned by another function
```javascript
const thunk = (store) => (next) => (action) =>
  typeof action === 'function' 
  ? action(store.dispatch)  // pass store.dispatch to an action that needs it
  : next(action);
  
const middlewares = [thunk]; // add thunk as a middleware
```

dispatch an action in another action creator function

```javascript
export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};
```

14. Normalizing API Responses

## key sentence
1. Any change to state is caused by a store.dispatch() call somewhere in the component. / The only way to get something into the state is to dispatch an action.

2. The todoApp reducer is the root reducer in this application. It is the one the store was created with, so its next state is the next state of the Redux store, and all the listeners(callbacks that have subscribed to the store) are notified.

3. It's best practice with React to have several components that don't specify any behaviors, and only are concerned with how things are rendered (how they look). These are called presentational components.

4. While presentational components just display data, we need a way to actually pass data from the store. This is where container components come in-- they can specify behavior and pass data.

5. Every container component needs a reference to store, you can pass it via props, or context, or use `<connect>` component.

6. The result of the connect call is the **container component** that is going to render the presentational component. It will calculate the props to pass to the presentational component by merging the objects returned from **mapStateToProps, mapDispatchToProps, and its own props**.

7. If we don't need to subcribe to the store, we can call connect() without mapStateToProps as an argument, instead passing in **null**. What this does is tell connect that there is no need to subscribe to the store.
It's a common pattern to inject just the dispatch function, so if connect() sees that the second argument is **null (or any falsey value)**, you'll get dispatch injected as a prop.

8. Action creators are typically kept separate from components and reducers in order to help with maintainability.

9. When you create a Redux store, its initial state is determined by the root reducer. Since **reducers are autonomous**, each of them **specifies its own initial state** as the default value of the state argument. (split the state tree/object into different key-value pairs)

10. When passing in a persistedState, it will **overwrite** the default values set in the reducer as applicable.

11. destructuring is a way to save the value of props at the time you need it.
"It's important that I destructure the filter right away, because by the time the callback fires, this.props.filter might have changed because the user might have navigated away."
https://github.com/tayiorbeii/egghead.io_idiomatic_redux_course_notes/blob/master/15-Dispatching_Actions_with_the_Fetched_Data.md

12. shorthand 
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
When the arguments for the **callback** prop match the arguments to the **action creator** exactly, there is a shorter way to specify mapDispatchToProps. Rather than pass a function, we can pass an **object mapping of the names of the callback props** that we want to inject and the action creator functions that create the corresponding actions.

This is a rather common case, so often you don't need to write mapDispatchToProps, and you can pass this map in object instead.

```javascrip
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));
```

use concise method notation
```javascrip
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick() {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
})
```
13. Technically, a container component is just a React component that uses store.subscribe() to **read a part of the Redux state tree and supply props to a presentational component it renders**. Typically, you just need to generate container components with the React Redux library's connect() function, which provides many useful optimizations to prevent unnecessary re-renders. (One result of this is that you shouldn't have to worry about the React performance suggestion of implementing shouldComponentUpdate yourself.)
