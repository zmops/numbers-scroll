import "./index.scss"
import React, { Component } from "react"
import ReactDom from "react-dom"
import NumbersCount from "../../components/numberScroll"
class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCount: 896507
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({showCount: Math.floor(Math.random() * 100000) + 90000 })
    }, 5000)
  }

  render() {
    const { showCount } = this.state
    return <div className="example-container">
      <img src="../../assets/img/tuiguang.png" onClick={() => { window.open("https://www.walkingfunny.com/webfunnyMonitor") }}/>
      <p className="title">数字滚动效果</p>
      <NumbersCount
        split={true}
        value={showCount}
        numberStyle={{
          fontSize: 50,
          background: "#51a4e9",
          color: "#fff",
          marginLeft: 2,
          marginRight: 2
        }}
      />
      <p className="des">每隔5s刷新数字</p>
    </div>
  }
}
ReactDom.render(<Main />, document.getElementById("app"))
