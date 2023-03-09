# numbers-scroll

A very simple light weight react-component that animates your number updates.
一个非常轻量的，react数字滚动组件。

![Scrolling Numbers](https://www.webfunny.cn/resource/scroll.gif)

## Installation

`npm install numbers-scroll --save`


## Examples 1


```javascript
import React, { useState } from 'react'
import NumbersScroll from 'numbers-scroll'

const MyNumberScroll = () => {
    const [number, setNumber] = useState(896507);
    return (
        <div className="example-container">
            <NumbersScroll
                split={true}
                value={number}
                numberStyle={{
                fontSize: 50,
                background: "#51a4e9",
                color: "#fff",
                marginLeft: 2,
                marginRight: 2
                }}
            />
        </div>
    )
}
```

## Examples 2

```javascript
import React, { Component } from "react"
import NumbersScroll from 'numbers-scroll'

class MyNumberScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 896507
    }
  }
  render() {
    const { number } = this.state
    return <div className="example-container">
      <NumbersScroll
        split={true}
        value={number}
        numberStyle={{
          fontSize: 50,
          background: "#51a4e9",
          color: "#fff",
          marginLeft: 2,
          marginRight: 2
        }}
      />
    </div>
  }
}
```

## Parameter Description（参数说明）

split：separator（分隔符）
value：number（数字）
numberStyle：number style（数字的样式）
containerStyle：container style（容器的样式）