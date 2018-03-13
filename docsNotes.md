## JSX

1. JSX may remind you of a template language, but it comes with the full power of JavaScript.
2. React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.
3. We split JSX over multiple lines for readability. While it isn’t required, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of automatic semicolon insertion.
4. After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.
5. By default, React DOM escapes any values embedded in JSX before rendering them. This helps prevent XSS (cross-site-scripting) attacks.
6. creatElement
```javascript
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
These objects are called “React elements”. You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date
```javascript
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```
## rendering elements
1. react elements -- describes what you want to see on the screen:
```jsx
const element = <h1>Hello, world</h1>;
```
Unlike browser DOM elements, React elements are plain objects

2. React elements are immutable. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

3. React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.
4. In our experience, thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class of bugs.

## Components and Props
1. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.
Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

2. Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (Button, Panel, Avatar), or is complex enough on its own (App, FeedStory, Comment), it is a good candidate to be a reusable component.

3. Whether you declare a component as a function or a class, it must never modify its own props.

4. React is pretty flexible but it has a single strict rule:
All React components must act like pure functions with respect to their props. State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.

## State and Lifecycle
1. State is similar to props, but it is private and fully controlled by the component.
2. In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.
3. We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called “mounting” in React.
We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called “unmounting” in React. These methods are called “lifecycle hooks”.
4. setState()
    * Do Not Modify State Directly
    * State Updates May Be Asynchronous
    * State Updates are Merged
5. The Data Flows Down. This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it. A component may choose to pass its state down as props to its child components.

## Handling Events
1. When using React you should generally not need to call addEventListener to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.
2. You have to be careful about the meaning of this in JSX callbacks. In JavaScript, class methods are not bound by default. If you forget to bind this.handleClick and pass it to onClick, this will be undefined when the function is actually called.
This is not React-specific behavior; it is a part of how functions work in JavaScript. Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method.

If you are using the experimental public class fields syntax, you can use class fields to correctly bind callbacks:
```jsx
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
This syntax is enabled by default in **Create React App**.

If you aren’t using class fields syntax, you can use an arrow function in the callback:
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```
The **problem** with this syntax is that a different callback is created each time the LoggingButton renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.
