import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

const rootReducer=combineReducers({
    ctr:counterReducer,
    res:resultReducer
});

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

//https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //fallback compose function

//the secend param of createStore is enhancer, middleware can be an enhancer
//connect middeleware to the store
//thunk make it possible to return a funtion that dispatch an action not directly an action itself
//to apply async, it can wait and dispatch action whenerver necessary
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
