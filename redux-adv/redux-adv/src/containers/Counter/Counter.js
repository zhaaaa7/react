import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';


class Counter extends Component {
    
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
        };
        return (
            <div>
                
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <CounterOutput value={this.props.ctr} />
                <button style={buttonStyle} onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <p>The result will be printed after 1s because thunk is used to realize async effect</p>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li style={style} key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter:()=>dispatch(actionCreators.increment()), //executed and returns an action
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(10)), //pass the psyload as argument
        onSubtractCounter: () => dispatch(actionCreators.subtract(15)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);