import React, {Component} from 'react';
import Comment from './Comment';


class CommentList extends Component {
    constructor(){
        super();
        this.state={
            
        };
    }

    static defaultProps={
        comments:[]
    };

    handleDeleteComment=(index)=>{
        if(this.props.onDeleteComment){
            this.props.onDeleteComment(index);
        }
    }

    render(){
        return (
            <div>
                {this.props.comments.map((item,index)=>{
                    return <Comment key={index} 
                                    comment={item} 
                                    onDeleteComment={this.handleDeleteComment} 
                                    index={index}/>
                })}
            </div>
        );
    }
}

export default CommentList;