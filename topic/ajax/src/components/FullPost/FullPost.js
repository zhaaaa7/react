import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state={
        loadedPost:null
    };

    componentDidUpdate(){
        if(this.props.id){
            //to avois setState and componentDidUpdate() infinite loop
            //load the content when first loading the full post
            //or only if there is no loadedPost or the post is new
            if(!this.state.loadedPost ||(this.state.loadedPost&& this.state.loadedPost.id!==this.props.id)){
                axios.get("/posts/"+this.props.id).then(
                response=>{
                    this.setState({loadedPost:response.data});
                }
                );
            }       
        }
        
    }

    //delete data
    deletePostHandler=()=>{
        axios.delete("/posts/"+this.props.id).then((response)=>{
            console.log(response);
        });
    }

    render () {
        let post = <p style={{textAlign:'center',border: '1px solid #eee',width:'90%',margin:'20px auto',boxShadow: '0 1px 1px #ccc',padding:'10px',backgroundColor:'#eee'}}>Please select a Post! The full post will be shown here!</p>;
        //show the loading after user click the post
        if(this.props.id){
            post = <p style={{textAlign:'center'}}>Loading!</p>;
        }
        //display the jsx just when the data is fecthed
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
            
        }
        return post;
    }
}

export default FullPost;