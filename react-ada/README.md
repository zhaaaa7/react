## css module

To scope the css file to each component, not globally
```
https://github.com/gajus/react-css-modules
```
* step
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

3. use 
```css
.App {
  text-align: center;
}
```
```javascript
import classes from './App.css';

<div className={classes.App}>
```
