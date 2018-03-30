## demo
https://routing-fa1a7.firebaseapp.com

## Basics
### routing
For a single html file, to mimic multiple page effect, use js code to render different parts (component) of the single page for different path.

### react-router package 
It is designed for parsing the path and then showing the appropriate jsx code/component.

### react-router-dom
It is used for routing to work in the browser.

```
npm install --save react-router react-router-dom 
```

## Details
1. In App.js, wrap everything with <BrowserRouter> .
      
When hosting, <BrowserRouter basename="my-app">, add basename if deploying in sub-folder
      
2. 
```jsx
<Route path=‘/’ render={()=><p>homepage</p>}>  renders a function
<Route path="/" exact component={FullPost} />  renders a component
```
attention: 'path' just check if the route starts with ‘/’, so this route will always be rendered. To make it exactly match, use 'exact' attribute: 
```jsx
<Route path=‘/’ exact>
```

3. To fix the problem that normal link in react app causes the **reloading of the page**, `<Link>` component makes it possible to just render different components inside the app. However, **it is just a `<a>` in real DOM**. You can add styling using `a` tag.

```jsx
<Link to={{
      pathname:
      hash:
      search:}}
/>
```
      
4. router returns some special properties 
<img src="https://github.com/zhaaaa7/react/blob/master/routing/routingnew.png" width="400px"/>
They become props of the “container” component rendered in <Route>, but don’t pass it down to the embedded children components. To pass those routing related props in the children components of the routed components, pass it as props or use withRouter().

* To pass it down from Posts to Post
In Posts.js
```jsx
<Post
   {… this.props} 
/>
```
* Or in Post.js
```javascript

import {withRouter} from 'react-router-dom';
   
withRouter(post)
```

5. `<Link to="" >` is always the to the absolute path (appended to the root domain), to use relative path (appended to the **current path**)
```jsx
  <Link to={this.props.match.url+’/new-post’ } />
```
      
relative and absolute path: https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/t/lecture/8140667?start=0
      
6. <NavLink> tells the router to find the “active” link and add css style to them with the default ".active" class.
if you want to specify the class name you hope react see as ".active", use "activeClassName". You can also add inline style for the ".active" class.
```jsx
<NavLink activeClassName=“..” activeStyle=“…”>  
```      

   
7. Add placeholder ':' , it is used as `this.props.match.params.id` in FullPost component.
```jsx
<Route path="/:id" exact component={FullPost} /> 
```
8. <Switch> load the first one that matches, pay attention to the order
      
9. Router is all about page stacks, `this.props.history.goBack() / push() /…`

10. Nested route: render another component inside one component. Use relative path:
```jsx
postSelectedHandler = (id) => {this.props.history.push({pathname:'/posts/'+id});}
.
.
.
<Post     
      key={post.id}
      title={post.title} 
      author={post.author}
      clicked={() => this.postSelectedHandler(post.id)} />
                        
.
.
.
    
<Route path={this.props.match.url+"/:id"} exact component={FullPost} />
```

in FullPost.js, accepting parmas from `this.props.match.params.id`(a string)
```javascript
if ( this.props.match.params.id ) {
      if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id) ) {
          axios.get( '/posts/' + this.props.match.params.id )
              .then( response => {
                  console.log(response);
                  this.setState( { loadedPost: response.data } );
              } );
      }
}
```

11. Redirect the user 
```jsx
   <Redirect from="/" to="/posts" />
```
Can’t use from if outside of <Switch>
      

* redirect user to /posts page after posting a new post:

method1: use a state and conditional rendering
```javascript
import {Redirect} from "react-router-dom";
.
.
.
state = {
        .
        .
        .
        submited:false
}
    
postDataHandler = () => {
        const data = {
            .
            .
            .
        };
        axios.post('/posts', data)
            .then(response => {
                this.setState({submited:true});
            });
    }
    
let redirect=null;
if(this.state.submited){
    redirect=<Redirect to="/posts"/>;
}

return (
      <div className="NewPost">
          {redirect}
          .
          .
          .
          <button onClick={this.postDataHandler}>Add Post</button>
       </div>
      )
                
```


method2: use `this.props.history.push('/posts')`
```javascript

postDataHandler = () => {
        const data = {
            .
            .
            .
        };
        axios.post('/posts', data)
            .then(response => {
                console.log(response);
                this.props.history.push('/posts'); //or this.props.history.replace('/posts')

            });
    }
.
.
.
return (
      <div className="NewPost">
          {redirect}
          .
          .
          .
          <button onClick={this.postDataHandler}>Add Post</button>
       </div>
      )

```

   
12. navigation guards: authentication status
```javascript
{this.state.auth?<Route path="/new-post" component={NewPost} /> :null}
```
13. 404 condition: catch any unknown url
```jsx
<Route render={()=><h1>not found</h1>} />
```
doesn’t work with 
```jsx
<Redirect from="/" to="/posts" /> 
```
because they all catch everything
   
14. Lazing loading: just download necessary code (user visited page) in bundle.js
```javascript
//works with create-react-app web pack config
const asyncComponent=(importComponent)=>{
    return class extends Component{
        state={
            component:null
        }

        componentDidMount(){
            //a function reference which returns a promise
            importComponent().then(cmp=>{
                this.setState({component:cmp.default});
            });
        }

        render(){
            let C=this.state.component;
            return C?<C {...this.props} />:null;
        }
    }
}
```
In Blog.js
```javascript
const AsyncNewPost=asyncComponent(()=>{
    return import('./NewPost/NewPost');
});
```

## Some tips
1. Routing is only known inside the app, use <BrowserRouter basename=“my-app"> for apps in subfolders when hosting.
2. Use console.log(this.props); //check the real key to debug
3. this.props.history.push({pathname:’/'+id}) is usable when needs to wait sth finishes
4. this.props.match.params.id is a string
5. Nested route will be shadowed by the route in the parent, order is important!!


