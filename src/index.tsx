import React from 'react'
import ReactDOM from 'react-dom'
const imgSrc = require('./w.jpg')
import './index.css'
import './a.scss'
// import calc from '../dll'

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
    // let c = add(2, 3)
    return (
      <div>
        <div className="feature_hello">
          hello
          <div id="feature_world">world</div>
        </div>
        <img src={imgSrc}></img>
        {this.state.count}
        <button onClick={this.handleClick}>点击</button>
        {/* {c} */}
      </div>
    )
  }
}

ReactDOM.render(<Counter num={1} />, document.getElementById('root'))
