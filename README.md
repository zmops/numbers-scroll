# numbers-scroll

A very simple light weight react-component that animates your number updates.

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
