1. use getter method

```jsx
class Example extends React.Component {
  get greeting() {
    return 'Yo!';
  }
  render() {
    return <h1>{this.greeting}</h1>;
  }
}
```
Note: getter method is a method

2. return jsx
```jsx
///Exporter.js
export function greet(text) {
  return <h1>{text}</h1>;
}

// Importer.js
import { greet } from './Exporter';
const h1 = greet('Hello world’);
```

Note: h1===<h1>Hello world</h1>


3. React SyntheticEvent also pass event object
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class Example extends React.Component {
  logger(param) {
    console.log(param);
  },
  render() {
    return <button onClick={this.logger}></button>;
  }
});
ReactDOM.render(<Example />, document.getElementById(‘app'));
```

Note: An event object is passed as an argument, because logger is being used as an event handler.
