import * as actionType from '../actions';

const initialState={
    counter:10,
};
const reducer=(state=initialState,action)=>{
    //action.type and actionType!!
    switch(action.type){
        case actionType.INCREMNENT:
            //const newState=Object.assign({},state);
            return {
                ...state,
                counter:state.counter+1
            }
        case actionType.DECREMENT:
            return {
                ...state,
                counter:state.counter-1
            }
        case actionType.ADD:
            return {
                ...state,
                counter:state.counter+action.value
            }
        case actionType.SUBSTRACT:
            return {
                ...state,
                counter:state.counter-action.value
            }
    }
    return state; //set the defalut bahavior so the app will not break down
};

export default reducer;