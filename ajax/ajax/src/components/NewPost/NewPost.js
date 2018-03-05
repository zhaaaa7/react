import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    //sending data back to api
    postDateHandler=()=>{
        const data={
            title:this.state.title,
            body:this.state.content,
            author:this.state.author
        };
        //axios will turn data into a json
        axios.post("/posts",data).then(response=>{
            console.log(response);
        });
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title<input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} /></label>
                <label>Content <textarea style={{verticalAlign: 'middle'}} rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} /></label>
                <label>Author
                    <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                        <option value="Shijie">Shijie</option>
                        <option value="Mauli">Mauli</option>
                        <option value="Fllyy">Fllyy</option>
                        <option value="Yuanso">Yuanso</option>
                    </select>
                </label>

                <button onClick={this.postDateHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
