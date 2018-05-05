import * as actionTypes from './actionTypes';

//synchronous actionCreator
export const saveResult=(res)=>{
    //const updatedResult=res*2;
    return {
        type:actionTypes.STORE_RESULT,
        result:res
    };
};

//asynchronous actionCreator
export const storeResult=(res)=>{
    //middleware runs between a dispatching of an action and the time the action reaches the producer
    //middleware steps in, block the old action and dispatch it again in the future
    //redux func passes two params : dispatch func and getState func
    return (dispatch,getState)=>{
        setTimeout(() => {
            //get the current state in central store
            const oldCounter=getState().ctr.counter;
            console.log(oldCounter);
            dispatch(saveResult(res));
        }, 1000);
    };
    
    
};


export const deleteResult=(resultElId)=>{
    return {
        type:actionTypes.DELETE_RESULT,
        resultElId:resultElId
    };
};