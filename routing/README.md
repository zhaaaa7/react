1.routing: a single html file, use js to render different parts of the single page for different path
2.router package: parse the path and show the appropriate jsx code/component
3.react-router-dom
4. In App.js, wrap everything with <BrowserRouter> 
5. <Route path=‘/’ render={()=><p>homepage</p>}>  renders a function
Just check if the route starts with ‘/’, always be rendered
<Route path=‘/’ exact>
6. <Route path="/" exact component={FullPost} />  renders a component
7. Normal link causes the reloading of the page. <Link> component re-render in the app. It create the <Link to={{
pathname:
hash:
search:}}>
8. router returns some specific properties as props of a “container”, but don’t pass it down to the embedded “components”
https://github.com/zhaaaa7/react/blob/master/routing/routing.png

9. To pass it down
   {… this.props} or use <WithRouter>container<WithRouter>
10. <Link to > is always the absolute path, (appended to the root domain)
to={this.props.match.url+’/…’ }relative path (appended to the current path)
11. <NavLink activeClassName=“..” activeStyle=“…”>  tells the router to find the “active” link
12. Placeholder: path=“/:id”
13.<Switch> load the first one that matches, attention to the order
14. Router is all about page stacks, this.props.history.goBack() / push() /…
15. Nested route: render another component inside one component
path={this.props.match.url+”/:id"}
16.redirect the user <Redirect from="/" to="/posts" />
Can’t use from if outside of <Switch>
17.navigation guards: authentication status
18.404 condition: 
<Route render={()=><h1>not found</h1>} /> doesn’t work with 
<Redirect from="/" to="/posts" /> this is a guards*/ } because they all catch everything
19. Lazing loading: just download necessary code (user visited page) in bundle.js
//works with create-react-app web pack config
20. Routing is only known inside the app, use <BrowserRouter basename=“my-app"> for apps in subfolders
