
1. Add Routes to load "Users" and "Courses" on different pages 
2. Add a simple navigation with two links => One leading to "Users", one leading to "Courses"
3. Make the courses in "Courses" clickable by adding a link and load the "Course" component in the place of "Courses" (without passing any data for now)
4. Pass the course ID to the "Course" page and output it there
5. Pass the course title to the "Course" page - pass it as query params and manually parse them
6. Load the "Course" component as a nested component of "Courses"
7. Add a 404 error page and render it for any unknown routes
8. Redirect requests to /all-courses to /courses (=> Your "Courses" page)
     
     
## live demo


<iframe width="560" height="315" src="https://www.youtube.com/embed/sSvCyukND9Y" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


<img src="https://github.com/zhaaaa7/react/blob/master/projects/gif/passparams.gif" alt="passparams"/>

## Some tips

1. url search params
encoding:  encode the params so that they can be used in url
```javascript
encodeURIComponent
```
decoding: search params is saved in `this.props.location.search`
```javascript
query=new URLSearchParams(this.props.location.search);
console.log(query); // an URLSearchParams instance, has a Symbol.iterator: entries()

console.log(query.entries()); // an iterator 

for (let param of query.entries()){ 
      console.log(param); // return an array ["title", "Database Application"]
}


```


2. Link `to` set the path the the directed page
```jsx
<Link  
       key={course.id} 
       to={{
           pathname:this.props.match.url+'/'+course.id,
           search:'?title='+course.title
       }}
     >
     <p className="Course">SI{course.id}: {course.title}</p>
</Link>
```
show the component in `Route`, use `:courseId` as a placeholder that is passed as `this.props.match.params`
```jsx
<Route path={this.props.match.url+'/:courseId'} component={Course}/>
```
params (values before `?` in the url) are passed in `this.props.match.params`
```jsx
<p>You selected the Course with ID: {this.props.match.params.courseId}</p>
```
