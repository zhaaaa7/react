1.Redux: has a global store, a giant js object, has a clearly defined process of how the state of the app may change
2. Action is a “messenger”, reducer changes the state
3. step:
A component “dispatches” an action
Reducer check the type of action and then define a block code regarding that type of action. It is just a pure function which receives the old state and action as params and return updated state. All sync.
Components subscribe to central storage store and then get the updated state as props.
4. Connect redux to react redux, react-redux
createStore(rootreducer)
<Provider  store={store}><App /></Provider> — a helper component
<connect>()(component) — a function which returns a higher order function, subscribe to the store
5. Immutability
https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns
For object
Not deep clone
newState=Object.assign({},state)
Or
return {
                …state,               
            }
For array
concat or filter

6. Outsource action types to avoid typo
7. Split reducers based on their task goal
rootReducer=combineReducers({ reduceri1:xx, reducer2: xx});
Remember to add the keys when mapping states to props
Each reducer can just access to the local state, not the state in other reducers. To get it, use the payload data.
8. What type of state should be controlled in redux?
Local UI state : often no
Persistent state: often in backend server, may store some slices in redux
Client state: user authenticated? User preference? In redux!
