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
```jsx
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

3. Passing Arguments to Event Handlers
Inside a loop it is common to want to pass an extra parameter to an event handler. For example, if id is the row ID, either of the following would work:
```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
The above two lines are equivalent, and use arrow functions and Function.prototype.bind respectively.
In both cases, the e argument representing the React event will be passed as a second argument after the ID. 

With an arrow function, we have to **pass it explicitly**, but with bind any further arguments are **automatically forwarded**.

## Conditional Rendering
1.  declaring a variable and using an if statement
2.  Inline If with Logical && Operator
```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```
It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
Therefore, if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.

3. Preventing Component from Rendering

Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods. For instance, componentWillUpdate and componentDidUpdate will still be called.
```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

## Lists and Keys
1. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity. The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.
```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
2. Keys only make sense in the context of the surrounding array. A good rule of thumb is that elements inside the map() call need keys.

3. Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:
```jsx
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

## Forms
1. It’s convenient to have a JavaScript function that handles the submission of the form and has access to the data that the user entered into the form. The standard way to achieve this is with a technique called “controlled components”.

2. Controlled Components

In HTML, form elements  typically maintain their own state and update it based on user input.  In React, mutable state is typically kept in the state property of components, and only updated with setState().
We can combine the two by making the React state be the “single source of truth”.  
  
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```


Since the value attribute is set on our form element, the displayed value will always be this.state.value, making the **React state the source of truth**. Since handleChange runs on every keystroke to update the React state, the **displayed value will update as the user types**.

3. <textarea>
In HTML, a '<textarea>' element defines its text by its children:
  
```
<textarea>
  Hello there, this is some text in a text area
</textarea>
```
In React, a <textarea> uses a value attribute instead. This way, a form using a <textarea> can be written very similarly to a form that uses a single-line input.
```jsx
<textarea value={this.state.value} onChange={this.handleChange} />
```
  
4. <select>
```
  <select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```
React, instead of using selected attribute, uses a value attribute on the root select tag. 
```jsx
this.state = {value: 'coconut'};
......
  
<select value={this.state.value} onChange={this.handleChange}>
  
.....
  
```
