import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
        state={
            posts:[],
            selectedPostId:null,
            error:false
        };

    componentDidMount(){
        //get returns a Promise object
        //once the promise resolves
        axios.get("/posts").then(response=>{
            //store first four of the fetched posts
            const posts=response.data.slice(10,16);
            const updatedPosts=posts.map(post=>{
                return{
                    ...post,
                    //add a new property
                    author:'Shijie Zhao'
                };
            });
            this.setState({posts:updatedPosts});
            //deal eith the error
        }).catch(error=>{
            this.setState({error:true});
            }); 
    }

    postSelectedHandler=(id)=>{
        this.setState({selectedPostId:id});
    }

    render () {
        //deal eith the error, conditional display
        let posts=<p>error!!!!!!</p>;
        if (!this.state.error){
            posts=this.state.posts.map(post=>{
                return (
                <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={()=>this.postSelectedHandler(post.id)}
                />
                );
            });
        }
        
        return (            
            <div>
                <h1 style={{textAlign:'center'}}>Welcome to MyPosts!!!</h1>
                <div style={{border:'1px solid black',width:'90%',margin:'0 auto'}}>
                <h2 style={{textAlign:'center'}}>Most Recent Posts</h2>
                <section className="Posts">
                {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                </div>
                
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;