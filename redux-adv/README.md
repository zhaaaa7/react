demo: https://redux-adv.firebaseapp.com

#### Redux dev tool:  https://github.com/zalmoxisus/redux-devtools-extension
### Middleware: 
1. functions / code you hook into a process which then then gets executed as a part of the process without stopping it. Do something with the action before it reaches the reducer.
```javascript
//middleware, run the code in between the reducer
const logger = store => {
    //let the action to the reducer
    return next => {
        //modify the action
        return action => {
            //the middleware
            console.log('[Middleware] dispatching',action); //action can be changed here
            const result=next(action); // pass the unmodified action, let the action continue to the reducer
            console.log('[Middleware] next state',store.getState());
            return result;
        }
    }
};
```
2. applyMiddleware
```javascript
const store=createStore(rootReducer,applyMiddleware(logger,thunk));
```
3.  thunk: https://github.com/gaearon/redux-thunk

### action creator
1. Run async code with action creators: a function that returns an action (object). 
2. thunk lets the action creator not return an action but a function which will then (asynchronously) dispatch another (normal, sync) action.
3. Use an index.js file to export all action creators

### other ...
1. Where to transform the data before reaching the store? Action creator or reducer? — probably reducer because it is designed to update the state
2. Use getState() or pass the state as a payload? Not too much logic in action creator.
3. Use an utility.js file for immutability and a clean switch statement.
