const redux=require('redux');
const createStore=redux.createStore;

const initialState={
    counter:0
};

//reducer, a store has to be initialized by reducer, 
//this is the only thing that updates the state, 
//only 1 reducer in the end
const rootReducer=(state=initialState,action)=>{
    if(action.type==='INC_COUNTER'){
        //immutablility
        return {
            ...state,
            counter:state.counter+1
        };
    }
    if(action.type==='ADD_COUNTER'){
        return {
            ...state,
            counter:state.counter+action.value
        };
    }
    return state; //fallback
};


//store, create the store with the reducer
const store=createStore(rootReducer);
console.log(store.getState()); // pull out the state of the store

//subscription, make it no need to call console.log(store.getState()), inform you when sth changes
//triggered when any dispatch action changes the state
store.subscribe(()=>{
    console.log('Subscription',store.getState());
});

//dispatch action, type is informer
//convention: upppercase, 
//then pass anything you want -- payload
store.dispatch({type:'INC_COUNTER'});
store.dispatch({type:'ADD_COUNTER',value:10});
console.log(store.getState());

