import React, { Component } from 'react';
//import axios from '../../axios'; //own instance
import './Blog.css';
import Posts from '../Posts/Posts';
import NewPost from './NewPost/NewPost';
import {Route,NavLink,Switch,Redirect}from 'react-router-dom';



//dynamic import
class Blog extends Component {

    state={
        //guards
        auth:true
    };
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                    to="/posts" 
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color:'#fa923f',
                                        textDecoration:'underline'
                                }}>Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                    pathname:'/new-post',
                                    hash:'#submit',
                                    search:'?quick-submit=true'
                                }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
           
            <Switch>  
           
            <Route path="/new-post" component={NewPost} />
            <Route path="/posts" component={Posts} />
            {/* <Route path="/:id" exact component={FullPost} /> */}
            {/* this.state.auth?<Route path="/new-post" component={NewPost} />:null 
             <Redirect from="/" to="/posts" /> this is a guards*/ }

            {/* deal with 404  */}
            <Route render={()=><h1>not found</h1>} />
           
            
            
            </Switch>
            </div>
        );
    }
}

export default Blog;