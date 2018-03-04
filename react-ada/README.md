## css module

To scope the css file to each component, not globally
```
https://github.com/gajus/react-css-modules
```
### Set Up

More Details: https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2

1. eject 
```
npm run ejct
```
2. change css loader in webpack.config.dev.js
```javascript
{
  test: /\.css$/,
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'

      },
    },
    ....
}
```
and webpack.config.prod.js
```javascript
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: {
          loader: require.resolve('style-loader'),
          options: {
            hmr: false,
          },
        },
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              minimize: true,
              sourceMap: shouldUseSourceMap,
            },
          },
          .....
}
```
Behind the scene, the css loader append 'local__hash:base64:5' to each css seletor to make it unique.

### Usage

css file
```css
.App {
  text-align: center;
}
```
js file
```javascript
import classes from './App.css';

<div className={classes.App}>
```
in the browser
```css
<div class="App__App__2NQx7">
```
to define a global styling rule
```css
:global .App { ... }
```
```javascript
<div className="App">
```
## Debugging
1. react-dev-tool https://github.com/facebook/react-devtools
1. error boundary component(react 16) https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html

componentDidCatch() lifecycle method
```javascript
class ErrorBoundary extends Component{
    state={
        hasError:false,
        errorMessage:''
    }

    componentDidCatch=(error,info)=>{
        this.setState(
            {
                hasError:true,
                errorMessage:error
            }
        );
    }

    render(){
        if(this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>;
        }else{
            return this.props.children;
        }
        
    }    
}
```
