import React from 'react'
import ReactDOM from 'react-dom'
const imgSrc = require('./w.jpg')
import './index.css'
import './a.scss'

interface IProps {
  num: number
}
let initState = { count: 0 }
type State = Readonly<typeof initState>
class Counter extends React.Component<IProps, State> {
  state: State = initState
  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }
  render() {
    return (
      <div>
        <div className="feature_hello">
          hello
          <div id="feature_world">world</div>
        </div>
        <img src={imgSrc}></img>
        {this.state.count}
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter num={1} />, document.getElementById('root'))
