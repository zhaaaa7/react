import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


axios.defaults.baseURL='https://jsonplaceholder.typicode.com';

//request interceptor
axios.interceptors.request.use(requestConfig=>{
    console.log(requestConfig);
    return requestConfig;//always return the requestConfig, otherwise all requests are blocked
},error=>{
    console.log(error);
    return Promise.reject(error); //forward the error to request
});
//response interceptor
axios.interceptors.response.use(response=>{
    return response;
},error=>{
    return Promise.reject(error);
});



ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
