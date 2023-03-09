import React, { Component } from "react"
import Utils from "../../common/utils"
import "./index.scss"
export default class NumbersCount extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { split = false, value, numberStyle, containerStyle } = this.props
    const { fontSize } = numberStyle
    const numberStyleObj = {}
    if (fontSize) numberStyleObj.width = fontSize * 0.7 / 100 + "rem"
    const tempNumberArray = (value + "").split("")
    const numberListLen = tempNumberArray.length
    const numberList = []
    tempNumberArray.forEach((n, index) => {
      numberList.push(n)
      if (split === true && index !== numberListLen - 1 && (numberListLen - index - 1) % 3 === 0) {
        numberList.push(",")
      }
    })
    return <div className="numbers-container" style={containerStyle}>
      {
        numberList.map((number, index) => {
          let scrollClass = ""
          if (number === "0") {
            scrollClass = "numbers-scroll0" + Utils.randomNumber(0, 5)
          } else {
            scrollClass = "numbers-scroll" + number
          }
          if (number === ",") {
            return <div className="numbers-box" key={index} style={{...numberStyleObj, color: this.props.numberStyle.color, fontSize, textAlign: "center"}}>,</div>
          }
          return <div className="numbers-box" key={index} style={numberStyleObj}>
            { value > 0 ?
              <span className={scrollClass}>
                <label style={this.props.numberStyle}>0</label>
                <label style={this.props.numberStyle}>1</label>
                <label style={this.props.numberStyle}>2</label>
                <label style={this.props.numberStyle}>3</label>
                <label style={this.props.numberStyle}>4</label>
                <label style={this.props.numberStyle}>5</label>
                <label style={this.props.numberStyle}>6</label>
                <label style={this.props.numberStyle}>7</label>
                <label style={this.props.numberStyle}>8</label>
                <label style={this.props.numberStyle}>9</label>
                <label style={this.props.numberStyle}>0</label>
              </span>
              :
              <span>
                <label>0</label>
              </span>
            }
          </div>
        })
      }
    </div>
  }
}