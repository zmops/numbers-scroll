# numbers-scroll

A very simple light weight react-component that animates your number updates. You can customize the style to adapt to a variety of scenes.

一个非常轻量的，react数字滚动组件，可以自定义样式，适应于多种场景。

<p align=center>
    <img width=680 src="https://www.webfunny.cn/resource/tuiguang.png"/>
</p>

---

## Scrolling effect

![Scrolling Numbers](https://www.webfunny.cn/resource/scroll.gif)

## Run Demo (运行Demo)

step1: git clone https://github.com/zmops/numbers-scroll.git

step2: npm install

step3: npm run dev

step4: http://localhost:9100/example.html


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
