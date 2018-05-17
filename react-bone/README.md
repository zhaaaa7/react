http://huziketang.mangojuice.top/books/react/lesson1

https://segmentfault.com/a/1190000011699963

<img src="https://github.com/zhaaaa7/react/blob/master/react-bone/btn.gif" alt="button component">

### a web component
1. createDOMFromString is a function that accepts a DOM string and returns the created HTML object
```javascript
 const createDOMFromString = (domString) => {
    const div = document.createElement('div');
    div.innerHTML = domString;
    return div;
}
```
2. the component
```javascript
class LikeButton {
    constructor () {
        this.state = { isLiked: false };
      }

      changeLikeText () {
        const likeText = this.el.querySelector('.like-text');
        this.state.isLiked = !this.state.isLiked;
        likeText.innerHTML = this.state.isLiked ? 'Cancel' : 'Like';
      }

      render () {
        this.el = createDOMFromString(`
          <button class='like-button'>
            <span class='like-text'>Like</span>
            <span>👍</span>
          </button>
        `);
        this.el.addEventListener('click', this.changeLikeText.bind(this), false);
        return this.el;
      }
}
```
3. use the component
```javascript
const wrapper = document.querySelector('.wrapper');

const likeButton1 = new LikeButton();
wrapper.appendChild(likeButton1.render());
```

### optimize DOM manipulation
* event handler will call the callback that change the state: `setState`
* `render` is called once the state is changed and a new HTML element with the new DOM string is created
* `setState` will call the `onStateChange`
* the new HTML element will replace the old one `likeButton.onStateChange`
1. the component
```javascript
class LikeButton {
    constructor () {
        this.state = { isLiked: false };
    }

    setState (state) {
        const oldEl = this.el;
        this.state = state;
        this.el = this.render(); 
        if (this.onStateChange) this.onStateChange(oldEl, this.el);
    }

    changeLikeText () {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render () {
        this.el = createDOMFromString(`
            <button class='like-btn'>
            <span class='like-text'>${this.state.isLiked ? 'Cancel' : 'Like'}</span>
            <span>👍</span>
            </button>
        `);
        this.el.addEventListener('click', this.changeLikeText.bind(this), false);
        return this.el;
    }
}
```
2. use the component

```javascript
const wrapper = document.querySelector('.wrapper');

const likeButton = new LikeButton()
    wrapper.appendChild(likeButton.render()); // insert the new button into DOM
    likeButton.onStateChange = (oldEl, newEl) => {
        wrapper.insertBefore(newEl, oldEl); // insert updatd button
        wrapper.removeChild(oldEl); // delete old button
}
```
 
  
 ### extract resuable methods and create a parent class
 1. Component class
 * `props` is to accept customized arguments
 * `_renderDOM` is a private method which will produce the HTML element, so `render` just accept a DOM string
 * `_renderDOM` listens for the event on the HTML element
 ```javascript
 class Component {
    constructor (props = {}) {
        this.props = props;
    }

    setState (state) {
        const oldEl = this.el;
        this.state = state;
        this._renderDOM();
        if (this.onStateChange) this.onStateChange(oldEl, this.el);
    }

    _renderDOM () {
        this.el = createDOMFromString(this.render());
        if (this.onClick) {
            this.el.addEventListener('click', this.onClick.bind(this), false);
        }
        return this.el;
        }
}
```

2. `mount` function is to interact with DOM api: add and update the component
```javascript
const mount = (component, wrapper) => {
    wrapper.appendChild(component._renderDOM());
    component.onStateChange = (oldEl, newEl) => {
        wrapper.insertBefore(newEl, oldEl);
        wrapper.removeChild(oldEl);
    }
}
```

3. Button class
```javascript
class LikeButton extends Component {
    constructor (props) {
        super(props);               
        this.state = { isLiked: false };
    }

    onClick () {
        this.setState({
            isLiked: !this.state.isLiked
        })
    }

    render () {
        return `
            <button class='like-btn' style="background-color: ${this.props.bgColor}">
            <span class='like-text'>${this.state.isLiked ? 'Cancel' : 'LIke'}</span>
            <span>👍</span>
            </button>
        `;
        }
}
```
4. use the component
```javascript
const wrapper = document.querySelector('.wrapper');

mount(new LikeButton({ bgColor: 'red' }), wrapper); // pass in the background color
```
