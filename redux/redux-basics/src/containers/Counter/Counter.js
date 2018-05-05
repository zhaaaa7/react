import React, { Component } from 'react';
import {connect} from "react-redux";
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionType from '../../store/actions';

class Counter extends Component {
    state = {
        counter: 0
    }


    render () {
        const buttonStyle={
            color:'#fff',
            margin: '20px auto',
            padding:'10px',
            backgroundColor:'#fa923f',
            borderRadius:'5px'
        };
        const style={
            backgroundColor:'#fa923f',
            opacity:0.5,
            width:'10%',
            margin:'10px'
        }
        return (
            <div>
                
                <CounterControl label="Increment" clicked={this.props.onIncreamentCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter}  />
                <CounterOutput value={this.props.ctr} />
                <button style={buttonStyle} onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <p>The result will be printed immediately because reducer can just work synchronously</p>
                <ul>
                    {this.props.storedResults.map(r=>(
                        <li style={style} key={r.id} onClick={()=>this.props.onDeleteResult(r.id)}>{r.value}</li>
                        //pass actions from the UI to the action
                    ))}                    
                </ul>
            </div>
        );
    }
}

//how the state in the state can be used here
//stores a function, retuns a js object
const mapStateToProps=state=>{
    return {
        ctr:state.ctr.counter,  
        //please give me the value of the counter props in the global state store with the props name ctr
        storedResults:state.res.results
    };
};

//dispatch is a helper function, it will dispatch the actions on the store
const mapDispatchToProps=dispatch=>{
    return {
        onIncreamentCounter:()=>dispatch({type:actionType.INCREMNENT}),        
        onDecrementCounter:()=>dispatch({type:actionType.DECREMENT}),
        onAddCounter:()=>dispatch({type:actionType.ADD,value:5}),
        onSubstractCounter:()=>dispatch({type:actionType.SUBSTRACT,value:5}),
        onStoreResult:(result)=>dispatch({type:actionType.STORE_RESULT,result:result}),
        onDeleteResult:(id)=>dispatch({type:actionType.DELETE_RESULT,resultElId:id}),
        //pass action payload from the UI to the reducer, and then to the store
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Counter);