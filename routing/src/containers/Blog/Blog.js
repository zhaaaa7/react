import React, { Component } from 'react';
//import axios from '../../axios'; //own instance
import './Blog.css';
import Posts from '../Posts/Posts';
import {Route,NavLink,Switch}from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';


//dynamic import
const AsyncNewPost=asyncComponent(()=>{
    return import('./NewPost/NewPost');
});


class Blog extends Component {

    state={
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
            {this.state.auth?<Route path="/new-post" component={AsyncNewPost} /> :null}
           
            <Route path="/posts" component={Posts} />
            <Route path="/"  render={()=><p style={{textAlign:'center'}}>Welcome to My Posts World!</p>} />
            {/* <Route render={()=><h1>not found</h1>} /> */}
            {/* <Redirect from="/" to="/posts" /> */}
            
            {/* <Route path="/:id" exact component={FullPost} /> */}
            </Switch>
            </div>
        );
    }
}

export default Blog;