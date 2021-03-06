### notes of https://reactjs.org/docs/hello-world.html

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
7. rules
* You cannot use a general expression as the React element type.
```jsx
//wrong!
return <components[props.storyType] story={props.story} />;
```
* You can pass any JavaScript expression as a prop. if statements and for loops are not expressions in JavaScript, so they can’t be used in JSX directly
* String Literals.You can pass a string literal as a prop. These two JSX expressions are equivalent:
```jsx
<MyComponent message="hello world" />

<MyComponent message={'hello world'} />
```
When you pass a string literal, its value is HTML-unescaped. So these two JSX expressions are equivalent:
```jsx
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```
* Spread attributes can be useful but they also make it easy to pass unnecessary props to components that don’t care about them or to pass invalid HTML attributes to the DOM. We recommend using this syntax sparingly
```jsx
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};
```

8. props.children
* HTML is unescaped, so you can generally write JSX just like you would write HTML in this way:
```
<div>This is valid HTML &amp; JSX at the same time.</div>
```

* A React component can also return an array of elements:
```jsx
render() {
  // No need to wrap list items in an extra element!
  return [
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```
**8-1. Functions as Children**
Normally, JavaScript **expressions** inserted in JSX will evaluate to **a string, a React element, or a list of those things**. However, props.children works just like any other prop in that it can pass any sort of data, not just the sorts that React knows how to render. For example, if you have a custom component, you could have it take a callback as props.children:
```jsx
// Calls the children callback numTimes to produce a repeated component
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```
8-2. false, null, undefined, and true are valid children. They simply don’t render.

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
  
4. In html
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

## Lifting State Up
https://codepen.io/gaearon/pen/WZpxpz?editors=0010

In React, sharing state is accomplished by moving it up to the closest **common ancestor** of the components that need it. This is called “lifting state up”. 

There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the **top-down data flow**.

Lifting state involves writing more “boilerplate” code than two-way binding approaches, but as a benefit, it takes less work to find and isolate bugs. Since any state “lives” in some component and that component alone can change it, the surface area for bugs is greatly reduced. Additionally, you can implement any custom logic to reject or transform user input.

If something can be derived from either props or state, it probably **shouldn’t be in the state**. For example, instead of storing both celsiusValue and fahrenheitValue, we store just the last edited temperature and its scale. The value of the other input can always be calculated from them in the render() method. This lets us clear or apply rounding to the other field without losing any precision in the user input.

## Composition vs Inheritance

1. Containment
Some components don’t know their children ahead of time. This is especially common for components like Sidebar or Dialog that represent generic “boxes”. We recommend that such components use the special children prop to pass children elements directly into their output:
```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Sometimes you might need multiple “holes” in a component. In such cases you may come up with your own convention instead of using children

https://codepen.io/gaearon/pen/gwZOJp?editors=0010

```jsx
function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
```
React elements like <Contacts /> and <Chat /> are just **objects**, so you can pass them as **props** like any other data.

2. Specialization
Sometimes we think about components as being “special cases” of other components. For example, we might say that a WelcomeDialog is a special case of Dialog.
In React, this is also achieved by composition, where a more “specific” component renders a more “generic” one and configures it with props
```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />

  );
}
```

3. At Facebook, we use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.
Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way.



## Typechecking With PropTypes

https://reactjs.org/docs/static-type-checking.html

1. To run typechecking on the props for a component, you can assign the special propTypes property.
2. Static type checkers like Flow and TypeScript identify certain types of problems before you even run your code. They can also improve developer workflow by adding features like auto-completion. 

## Refs and the DOM
1. In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. 
2. React supports a special attribute that you can attach to any component. The ref attribute takes a callback function, and the callback will be executed immediately after the component is mounted or unmounted
3. When the ref attribute is used on an HTML element, the ref callback receives the underlying DOM element as its argument. For example, this code uses the ref callback to store a reference to a DOM node
```jsx
focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  }
.......


<input
          type="text"
          ref={(input) => { this.textInput = input; }} />
```
React will call the ref callback with the DOM element when the component mounts, and call it with null when it unmounts. ref callbacks are invoked before componentDidMount or componentDidUpdate lifecycle hooks.

4. When the ref attribute is used on a custom component declared as a **class**, the ref callback receives the **mounted instance** of the component as its argument. You may not use the ref attribute on **functional components** because they don’t have instances.
5. If the ref callback is defined as an inline function, it will get called twice during updates, first with null and then again with the DOM element.

## Uncontrolled Components
1. Since an uncontrolled component keeps the source of truth in the DOM, it is sometimes easier to integrate React and non-React code when using uncontrolled components. 

## Reconciliation
1. React provides a declarative API so that you don’t have to worry about exactly what changes on every update.

## Context
1. In some cases, you want to pass data through the component tree without having to pass the props down manually at every level. You can do this directly in React with the powerful “context” API.

## Fragments
1. A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.
```jsx
return (
      <React.Fragment key={item.id}>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
```
key is the only attribute that can be passed to Fragment.
 
## Portals
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. The portal still exists in the React tree regardless of position in the DOM tree

## Error boundaries
1. Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

2. A class component becomes an error boundary if it defines a new lifecycle method called componentDidCatch(error, info)

3. try / catch is great but it only works for **imperative** code:
```javascript
try {
  showButton();
} catch (error) {
  // ...
}
```
However, React components are **declarative** and specify what should be rendered:
```jsx
<Button />
```
Error boundaries preserve the declarative nature of React, and behave as you would expect. For example, even if an error occurs in a componentDidUpdate hook caused by a setState somewhere deep in the tree, it will still correctly **propagate** to the closest error boundary.

4. Error boundaries do not catch errors inside event handlers. React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle hooks, the **event handlers don’t happen during rendering**.

## Web Components
React and Web Components are built to solve different problems. Web Components provide strong **encapsulation for reusable components**, while React provides a **declarative library** that keeps the **DOM in sync with your data**. The two goals are complementary.

## Higher-Order Components
1. A higher-order component (HOC) is an advanced technique in React for reusing component logic. Concretely, a higher-order component is a function that takes a component and returns a new component. Whereas a component transforms props into UI, a higher-order component transforms a component into another component.

### Render Props
1. More concretely, a render prop is a function prop that a component uses to know what to render.
