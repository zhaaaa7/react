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
2. change css loader in webpack.config.dev
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
