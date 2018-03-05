## Basics
### routing
For a single html file, use js code to render different parts (component) of the single page for different path.

### router package 
It is designed for parsing the path and then showing the appropriate jsx code/component.

### react-router-dom
It is used for routing to work in the browser.

## Details
1. In App.js, wrap everything with <BrowserRouter> 
2. 
```jsx
<Route path=‘/’ render={()=><p>homepage</p>}>  renders a function
<Route path="/" exact component={FullPost} />  renders a component
```
attention: 'path' just check if the route starts with ‘/’, so this route will always be rendered. To make it exactly match, use 'exact' attribute: 
```jsx
<Route path=‘/’ exact>
```
3. To fix the problem that normal link in react app causes the reloading of the page, <Link> component makes it possible to just render different components inside the app. 
```jsx
<Link to={{
      pathname:
      hash:
      search:}}
/>
```
4. router returns some special properties 
<img src="https://github.com/zhaaaa7/react/blob/master/routing/routing.png" width="400px"/>
They become props of the “container” rendered in <Route>, but don’t pass it down to the embedded children components.

To pass it down from Posts to Post
In Posts.js
```jsx
<Post
   {… this.props} 
/>
```
```javascript
Or in Post.js
import {withRouter} from 'react-router-dom';
   
withRouter(post)
```
5. <Link to="" > is always the to the absolute path (appended to the root domain), to use relative path (appended to the current path)
```jsx
  <Link to={this.props.match.url+’/new-post’ } />
```

6. <NavLink activeClassName=“..” activeStyle=“…”>  tells the router to find the “active” link and add css style to them. The applied css rule is in .active selector.
   
7. Add placeholder ':' 
```jsx
<Route path="/:id" exact component={FullPost} /> 
```
8 .<Switch> load the first one that matches, pay attention to the order
9. Router is all about page stacks, this.props.history.goBack() / push() /…
10. Nested route: render another component inside one component. To use relative path:
```jsx
   <Route path={this.props.match.url+"/:id"} exact component={FullPost} />
```
11. Redirect the user 
```jsx
   <Redirect from="/" to="/posts" />
```
Can’t use from if outside of <Switch>
   
12. navigation guards: authentication status
```javascript
{this.state.auth?<Route path="/new-post" component={NewPost} /> :null}
```
13.404 condition: 
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
15. Routing is only known inside the app, use <BrowserRouter basename=“my-app"> for apps in subfolders when hosting.
