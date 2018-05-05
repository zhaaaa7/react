import React, { Component } from 'react';
import './App.css';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class App extends Component {

  constructor(){
    super();
    this.state={
      comments:[],
    };
  }

  componentWillMount(){
    this._loadComments();

  }

  _saveComments=(comments)=>{
    localStorage.setItem('comments',JSON.stringify(comments));
  }

  _loadComments=()=>{
      let comments=localStorage.getItem('comments');
      if(comments){
          comments=JSON.parse(comments);
          this.setState({comments});
      }
  }

  handleSubmitComment=(comment)=>{
    if (!comment) return;
    if (!comment.username) return alert('Please enter username');
    if (!comment.content) return alert('Please enter comment content');

    const oldComments=[...this.state.comments];
    oldComments.push(comment);
    this.setState({comments:oldComments});
    this._saveComments(oldComments);
  }

  handleDeleteComment=(index)=>{
    const oldComments=[...this.state.comments];
    oldComments.splice(index,1);
    this.setState({comments:oldComments});
    this._saveComments(oldComments);
  }

  render() {
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment} />
        <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment}/>
      </div>
    );
  }
}

export default App;
