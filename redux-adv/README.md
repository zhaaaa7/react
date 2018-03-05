9. Middleware: functions / code you hook into a process which then then gets executed as a part of the process without stopping it. Do something with the action before it reaches the reducer.
10. applyMiddleware
11. Redux dev tool:  https://github.com/zalmoxisus/redux-devtools-extension
12. Run async code with action creators: a function that returns an action (object). 
13. middleware: thunk: https://github.com/gaearon/redux-thunk
Let the action creator not return an action but a function which will then (asynchronously) dispatch another (normal, sync) action.
14. Use an index.js file to export all action creators
15. Where to transform the data before reaching the store? Action creator or reducer? — probably reducer because it is designed to update the state
16. Use getState() or pass the state as a payload? Not too much logic in action creator.
17. Use an utility.js file for immutability and a clean switch statement.
