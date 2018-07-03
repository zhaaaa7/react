live demo:
<iframe width="560" height="315" src="https://www.youtube.com/embed/0_XE_HAj0iA" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

https://ajax-32025.firebaseapp.com

1. Ajax is how Http Requests happens in react 
2. Fake api https://jsonplaceholder.typicode.com 

3. axios is used to make http requests https://github.com/axios/axios
* Axios interceptor can be used to add some behavior, such as adding some authentication header   
* in componentWillUnMount(), remove axios.interceptor to avoid memory leak
    
4. componentDidMount() is usually where http requests always happens
```javascript
 componentDidMount(){
        axios.get("/posts").then(response=>{
            const posts=response.data.slice(10,12);
            //modify the data
            const updatedPosts=posts.map(post=>{
                return{
                    ...post,
                    //add a new property
                    author:'Shijie Zhao'
                };
            });
            this.setState({posts:updatedPosts});
        }).catch(error=>{
            this.setState({error:true}); //update the error in state
        }); 
    }
```

5. componentDidUpdate() is another place where http requests always happens when the **props passed down from the parent changes**. However, you need to check something to avoid setState() and componentDidUpdate() infinite loop because setState() causes an update.
```javascript
    componentDidUpdate(){
        if(this.props.id){
            //load the full post when clicking the post for the first time
            //or only if there is already a loadedPost but the clicked post's id is new
            if(!this.state.loadedPost ||(this.state.loadedPost&& this.state.loadedPost.id!==this.props.id)){
                axios.get("/posts/"+this.props.id).then(response=>{
                    this.setState({loadedPost:response.data});
                });
            }       
        }
        
    }
```

6. You need an error handling mechanism
```javascript
let posts=<p>error!!!!!!</p>;
// if there is no error
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
        
```

7. you can create an axios instance and set unique settings 
