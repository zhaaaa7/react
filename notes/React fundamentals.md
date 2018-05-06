## setState

https://juejin.im/post/5a155f906fb9a045284622b4

```javascript
class Eg extends Component {
  contructor () {
    super()
    this.state = {
      value: 0,
      index: 0
    }
  }

  componentDidMount () {
    this.setState({value: this.state.value + 1})
    console.log(this.state.value) // first output
    this.setState({value: this.state.value + 1})
    console.log(this.state.value) // second output
    setTimeout(() => {
      this.setState({value: this.state.value + 1})
      console.log(this.state.value) // third output
      this.setState({value: this.state.value + 1})
      console.log(this.state.value) // fourth output
    }, 0)；
        this.refs.button.addEventListener('click', this.click)
  }

  click = () => {
    this.setState({value: this.state.index + 1})
    this.setState({value: this.state.index + 1})
  }

  render () {
    return (
      <div><span>value: {this.state.value}index: {this.props.index}</span>
        <button ref="button" onClick={this.click}>点击</button>
      </div>
    )
  }
}

```

output: 0 0 2 3
