import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Shijie',
        submited:false
    }

    componentDidMount(){
        // another way of guarding
        //if not auth: this.props.history.replace('/posts');
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        axios.post('/posts', data)
            .then(response => {
                console.log(response);
                this.props.history.push('/posts'); //or this.props.history.replace('/posts'), so can't go back to former page
                // this.setState({submited:true});
            });
    }

    render () {
        let redirect=null;
        //conditional redirect, did sth happen, then render ...
        if(this.state.submited){
            redirect=<Redirect to="/posts"/>;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title<input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} /></label>                
                <label>Content <textarea style={{verticalAlign: 'middle'}} rows="10" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} /></label>      
                <label>Author
                    <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                        <option value="Shijie">Shijie</option>
                        <option value="Mauli">Mauli</option>
                        <option value="Fllyy">Fllyy</option>
                        <option value="Yuanso">Yuanso</option>
                    </select>
                </label>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;