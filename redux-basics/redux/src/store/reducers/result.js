import * as actionType from '../actions';

const initialState={
    results:[],
};
const reducer=(state=initialState,action)=>{
    //has to run synchronously
    switch(action.type){
        case actionType.STORE_RESULT:
            return {
                ...state,
                results:state.results.concat({id:new Date(),value:action.result}) 
                //can use the property in other reducer files
            }   
        case actionType.DELETE_RESULT:
            //const newArray=[...state.results]; //not deep copy
            const updatedArray=state.results.filter((el,index)=>{
                return el.id!==action.resultElId; //resultElId is passed when calling onDeleteResult, the clicked result id
            });            
            return {
                ...state,
                results:updatedArray
            }   
    }
    return state; //set the defalut bahavior so the app will not break down
};

export default reducer;