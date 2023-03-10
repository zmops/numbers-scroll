export default class Utils {
  static DAY_TIME = 24 * 60 * 60 * 1000
  static HOUR_TIME = 60 * 60 * 1000
  static isArray(object) {
    return Object.prototype.toString.call(object) === "[object Array]"
  }
  static isObject(object) {
    return Object.prototype.toString.call(object) === "[object Object]"
  }
  static randomNumber(n, m) {
    const random = Math.floor(Math.random() * (m - n + 1) + n)
    return random
  }
  static b64EncodeUnicode(tempStr) {
    const str = encodeURIComponent(tempStr)
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode("0x" + p1)
    }))
  }
  static b64DecodeUnicodeForHttpLog(str) {
    try {
      return decodeURIComponent(decodeURIComponent(atob(str).split("").map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      }).join("")))
    } catch (e) {
      return str
    }
  }
  static b64DecodeUnicode(str) {
    try {
      return decodeURIComponent(decodeURIComponent(atob(str).split("").map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      }).join("")))
    } catch (e) {
      return str
    }
  }
  static b64DecodeUnicodeWithSpace(tempStr) {
    if (!tempStr) return ""
    let str = ""
    try {
      str = tempStr.replace(/ /g, "+")
      return decodeURIComponent(decodeURIComponent(atob(str).split("").map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      }).join("")))
    } catch (e) {
      return str
    }
  }
  static b64DecodeUnicodeBehavior(tempStr) {
    if (!tempStr) return ""
    const str = tempStr.replace(/ /g, "+")
    try {
      return decodeURIComponent(decodeURIComponent(atob(str).split("").map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      }).join("")))
    } catch (e) {
      return tempStr
    }
  }
  static qs(object, cache) {
    const arr = []
    function inner(innerObj, prefix) {
      for (const prop in innerObj) {
        if (!innerObj.hasOwnProperty(prop)) return
        const textValue = innerObj[prop]
        if (!Utils.isArray(textValue)) {
          if (Utils.isObject(textValue)) inner(textValue, prefix ? prefix + "." + prop : prop)
          else arr.push(encodeURIComponent((prefix ? prefix + "." : "") + prop) + "=" + encodeURIComponent(textValue || ""))
        } else {
          textValue.forEach((val) => {
            arr.push(encodeURIComponent((prefix ? prefix + "." : "") + prop + "[]") + "=" + encodeURIComponent(val || ""))
          })
        }
      }
    }
    inner(object, "")
    if (cache && !object._) {
      arr.push("_=" + encodeURIComponent(BUILD_NO))
    }
    return arr.length ? "?" + arr.join("&") : ""
  }

  static parseQs() {
    const s = window.location.search
    const index = s.indexOf("?")
    const result = {}
    if (index === -1) return result
    const arr = s.substr(index + 1).split("&")
    arr.forEach((item) => {
      const equals = item.split("=")
      let key = decodeURIComponent(equals[0])
      const val = decodeURIComponent(equals[1] || "")
      let i = 0
      const splitting = key.split(".")
      const len = splitting.length
      key = splitting[len - 1]
      let temp = result
      if (len > 1) {
        for (; i < len - 1; i++) {
          if (!temp[splitting[i]] || !CommonTool.isObject(temp[splitting[i]])) temp[splitting[i]] = {}
          temp = temp[splitting[i]]
        }
      }
      if (key.substr(-2) !== "[]") {
        temp[key] = val
      } else {
        key = key.substr(0, key.length - 2)
        if (!temp[key]) temp[key] = [val]
        else temp[key].push(val)
      }
    })
    return result
  }

  // ????????????
  static quickSort(arr) {
    // ????????????<=1,???????????????
    if (arr.length <= 1) { return arr }
    const pivotIndex = Math.floor(arr.length / 2)
    // ??????????????????????????????????????????
    const pivot = arr.splice(pivotIndex, 1)[0]
    // ??????????????????
    const left = []
    const right = []

    // ?????????????????????left????????????????????????right
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] <= pivot) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    // ??????
    return Utils.quickSort(left).concat([pivot], Utils.quickSort(right))
  }
  static showLoading() {
  }
  // ??????24????????????
  static get24HoursArray() {
    const dateTime = new Date().getTime()
    const hourArray = []
    for (let i = 0; i < 24; i++) {
      const tempDateTime = dateTime - i * 60 * 60 * 1000
      const hour = new Date(tempDateTime).Format("MM-dd hh")
      hourArray.push(hour)
    }
    return hourArray
  }
  // ??????timeSize??????????????????
  static getHoursArrayByTimeSize(timeSize) {
    if (timeSize === 0) {
      const dateTime = new Date().getTime() - timeSize * Utils.DAY_TIME
      const hourArray = []
      for (let i = 0; i <= 24; i++) {
        const tempDateTime = dateTime - i * Utils.HOUR_TIME
        const hour = new Date(tempDateTime).Format("MM-dd hh")
        hourArray.push(hour)
      }
      return hourArray
    }
    // ???????????????????????????
    const dateTime = new Date().getTime() - timeSize * Utils.DAY_TIME
    const dateTimeStr = new Date(dateTime).Format("MM-dd")
    const hourArray = []
    for (let i = 0; i < 24; i++) {
      const hourStr = i < 10 ? "0" + i : i
      const hour = dateTimeStr + " " + hourStr
      hourArray.push(hour)
    }
    return hourArray.reverse()
  }
  // ??????timeSize???????????????????????????
  static getSevenDaysAgoHoursArrayByTimeSize(timeSize) {
    if (timeSize === 0) {
      const dateTime = new Date().getTime() - (7 + timeSize) * Utils.DAY_TIME
      const hourArray = []
      for (let i = 0; i <= 24; i++) {
        const tempDateTime = dateTime - i * Utils.HOUR_TIME
        const hour = new Date(tempDateTime).Format("MM-dd hh")
        hourArray.push(hour)
      }
      return hourArray
    }
    // ???????????????????????????
    const dateTime = new Date().getTime() - (7 + timeSize) * Utils.DAY_TIME
    const dateTimeStr = new Date(dateTime).Format("MM-dd")
    const hourArray = []
    for (let i = 0; i < 24; i++) {
      const hourStr = i < 10 ? "0" + i : i
      const hour = dateTimeStr + " " + hourStr
      hourArray.push(hour)
    }
    return hourArray.reverse()
  }
  static getSevenDaysAgo24HoursArray() {
    const dateTime = new Date().getTime() - 7 * 24 * 60 * 60 * 1000
    const hourArray = []
    for (let i = 0; i < 24; i++) {
      const tempDateTime = dateTime - i * 60 * 60 * 1000
      const hour = new Date(tempDateTime).Format("MM-dd hh")
      hourArray.push(hour)
    }
    return hourArray
  }
  static analysisInfoData(data, hours) {
    // const nowHour = new Date().getHours()
    const dateArray = [], infoArray = []
    let infoTotalCount = 0
    for (let i = 0; i < hours.length - 1; i++) {
      let isInclude = false
      for (let j = 0; j < data.length; j++) {
        if (data[j].hour === hours[i]) {
          const tempHour = hours[i]
          const tempCount = data[j].count
          dateArray.push(tempHour)
          infoArray.push(tempCount)
          infoTotalCount = infoTotalCount + parseInt(data[j].count, 10)
          isInclude = true
          break
        }
      }
      if (isInclude === false) {
        dateArray.push(hours[i])
        infoArray.push(0)
      }
    }
    // ??????????????????0?????????
    const usefulArray = data.filter((item) => { return item.count > 0 })
    return { infoTotalCount, dateArray, infoArray, usefulArray }
  }
  static loadJs(url, onload) {
    const script = document.createElement("script")
    script.async = 1
    script.onload = typeof onload === "function" ? onload : () => { }
    script.src = url
    const dom = document.getElementsByTagName("script")[0]
    dom.parentNode.insertBefore(script, dom)
  }
  // ???????????????. ??????: ????????????????????????function, ??????function???????????????????????????
  static deepCopy(o) {
    if (o instanceof Array) {
      const n = []
      for (let i = 0; i < o.length; ++i) {
        n[i] = this.deepCopy(o[i])
      }
      return n
    } else if (o instanceof Object) {
      const n = {}
      for (const i in o) {
        n[i] = this.deepCopy(o[i])
      }
      return n
    }
    return o
  }

  static addDays(dayIn) {
    let CurrentDate = ""
    const date = new Date()
    const myDate = new Date(date.getTime() + dayIn * 24 * 60 * 60 * 1000)
    const year = myDate.getFullYear()
    const month = myDate.getMonth() + 1
    const day = myDate.getDate()
    CurrentDate = year + "-"
    if (month >= 10) {
      CurrentDate = CurrentDate + month + "-"
    } else {
      CurrentDate = CurrentDate + "0" + month + "-"
    }
    if (day >= 10) {
      CurrentDate = CurrentDate + day
    } else {
      CurrentDate = CurrentDate + "0" + day
    }
    return CurrentDate
  }
  static addMomentDate(dayIn) {
    const date = new Date()
    const myDate = new Date(date.getTime() + dayIn * 24 * 60 * 60 * 1000)
    const year = myDate.getFullYear()
    const month = myDate.getMonth()
    const day = myDate.getDate()
    return [year, month, day]
  }

  static toFixed(tempNum, s) {
    let num = tempNum
    const times = Math.pow(10, s)
    if (num < 0) {
      num = Math.abs(num)//??????????????????????????????????????????????????????????????????
      const des = parseInt(num * times + 0.5, 10) / times
      return -des
    }
    const des = parseInt(num * times + 0.5, 10) / times
    let finalDes = des
    const tempDes = des + ""
    if (tempDes.indexOf(".") !== -1) {
      const start = tempDes.split(".")[0]
      let end = tempDes.split(".")[1]
      if (end.length > s) {
        end = end.substring(0, 2)
      }
      finalDes = start + "." + end
    }
    return finalDes * 1
  }

  static getCookie(name) {
    let arr
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    if (document.cookie.match(reg)) {
      arr = document.cookie.match(reg)
      return unescape(arr[2])
    }
    return ""
  }
  /**
   * key cookie???key
   * value cookie??????
   * extraTime cookie???????????????
   */
  static setCookie(key, value, extraTime = 24 * 3600 * 1000, hostname = window.location.hostname) {
    const exp = new Date()
    exp.setTime(exp.getTime() + extraTime)
    document.cookie = key + "=" + value + ";Path=/;domain=" + hostname + ";expires=" + exp.toGMTString()
  }

  // ???????????????
  static removeDuplicateForString(str) {
    const arr = str.split("")
    const mySet = new Set(arr)
    const resArr = Array.from(mySet)
    const resStr = resArr.join("")
    return resStr
  }

  /**
   * ????????????????????????
   * @param {*} arr ????????????
   * @param {*} key ??????key????????????
   * @param {*} begin ????????????, ?????????0
   * @param {*} end ????????????, ???????????????????????????index
   */
  static quickSortForObject(arr, key, begin, end) {
    if (begin > end) return

    const tempValue = arr[begin][key]
    const tmp = arr[begin]
    let i = begin
    let j = end
    while (i !== j) {
      while (arr[j][key] >= tempValue && j > i) {
        j--
      }
      while (arr[i][key] <= tempValue && j > i) {
        i++
      }
      if (j > i) {
        const t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
      }
    }
    arr[begin] = arr[i]
    arr[i] = tmp
    Utils.quickSortForObject(arr, key, begin, i - 1)
    Utils.quickSortForObject(arr, key, i + 1, end)
  }

  /**
   * ??????????????????timeScope
   */
  static handleTimeScope(searchDate) {
    return Math.floor((new Date().getTime() - new Date(searchDate + " 00:00:00").getTime()) / (24 * 60 * 60 * 1000))
  }

  /**
   * ?????????????????????????????????
   */
  static handleTime = (time, unitType) => {
    let tempCount = time * 1
    let unit = ""
    if (tempCount <= 0) {
      return {
        value: tempCount,
        unit: "",
      }
    } else if (unitType === "time") {
      unit = tempCount < 1000 ? "ms" : "s"
      if (tempCount > 1000) {
        tempCount = Utils.toFixed(tempCount / 1000, 2)
      } else {
        tempCount = Utils.toFixed(tempCount, 2)
      }
    } else if (unitType === "count") {
      if (tempCount > 10000) {
        unit = "???"
        tempCount = Utils.toFixed(tempCount / 10000, 2)
      } else if (tempCount > 1000) {
        unit = "???"
        tempCount = Utils.toFixed(tempCount / 1000, 2)
      }
    } else if (unitType === "percent") {
      unit = "%"
    }
    return {
      value: tempCount, unit
    }
  }

  static calcTimeForZh(happenTime) {
    const currentTime = new Date().getTime()
    const resTime = currentTime - happenTime
    let resStr = ""
    if (resTime < 60 * 1000) {
      resStr = "??????"
    } else if (resTime < 60 * 60 * 1000) {
      resStr = `${Math.floor(resTime / 60000)}?????????`
    } else if (resTime < 24 * 60 * 60 * 1000) {
      resStr = `${Math.floor(resTime / (60 * 60 * 1000))}?????????`
    } else {
      resStr = `${Math.floor(resTime / (24 * 60 * 60 * 1000))}??????`
    }
    return resStr
  }

  static ajax(method, url, param, successCallback, failCallback) {
    try {
      const xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
      xmlHttp.open(method, url, true)
      xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
          let response = {}
          try {
            response = xmlHttp.responseText ? JSON.parse(xmlHttp.responseText) : {}
          } catch (e) {
            console.error(xmlHttp.responseText)
            response = {}
          }
          typeof successCallback === "function" && successCallback(response)
        } else {
          typeof failCallback === "function" && failCallback()
        }
      }
      xmlHttp.onerror = () => {
        typeof failCallback === "function" && failCallback()
      }
      const resultStr = JSON.stringify(param || {})
      xmlHttp.send("data=" + resultStr)
    } catch (e) {
      console.warn(e)
    }
  }

  static handleTreeData(obj) {
    const result = []
    for (const key in obj) {
      const tempObj = {}
      tempObj.title = key
      tempObj.key = key
      if (typeof obj[key] === "object") {
        tempObj.children = Utils.handleTreeData(obj[key])
      } else {
        if (typeof obj[key] === "string") {
          tempObj.children = [{ title: `"${obj[key]}"`, key: `"${obj[key]}"` }]
        } else if (typeof obj[key] === "number") {
          tempObj.children = [{ title: obj[key], key: obj[key] }]
        } else if (typeof obj[key] === "boolean") {
          const childrenObj = {}
          switch (obj[key]) {
            case true:
              childrenObj.title = "true"
              childrenObj.key = "true"
              break
            case false:
              childrenObj.title = "false"
              childrenObj.key = "false"
              break
            default:
              break
          }
          tempObj.children = [childrenObj]
        }
      }
      result.push(tempObj)
    }
    return result
  }
  //chenyang
  static encodeURIFunc(url = window.location.href) {
    const obj = {},
      index = url.indexOf("?"),
      params = url.substr(index + 1)

    if (index !== -1) { // ????????????
      const parr = params.split("&")
      for (const i of parr) {
        const arr = i.split("=")
        obj[arr[0]] = arr[1]
      }
    }

    return obj
  }
  /**
     * ???Date??????????????? Date ????????????????????????String
     * ???(M)??????(d)?????????(h)??????(m)??????(s)?????????(q) ????????? 1-2 ???????????????
     * ???(y)????????? 1-4 ?????????????????????(S)????????? 1 ????????????(??? 1-3 ????????????)
     * ?????????
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     */
  static formatTime(date, format) {
    const t = new Date(date)
    const tf = (i) => { return (i < 10 ? "0" : "") + i }
    return format.replace(/yyyy|MM|M|dd|d|HH|mm|ss/g, (a) => {
      switch (a) {
        case "yyyy":
          return tf(t.getFullYear())
        case "MM":
          return tf(t.getMonth() + 1)
        case "M":
          return t.getMonth() + 1
        case "mm":
          return tf(t.getMinutes())
        case "dd":
          return tf(t.getDate())
        case "d":
          return t.getDate()
        case "HH":
          return tf(t.getHours())
        case "ss":
          return tf(t.getSeconds())
        default:
          return ""
      }
    })
  }

  //set url params
  static updateQueryStringParameter(uri, key, value) {
    // if (!value) {
    //     return uri
    // }
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i")
    const separator = uri.indexOf("?") !== -1 ? "&" : "?"
    if (uri.match(re)) {
        return uri.replace(re, "$1" + key + "=" + value + "$2")
    }
    return uri + separator + key + "=" + value
  }

  // ????????????
  static copyContent(content) {
    const input = document.createElement("input")
    document.body.appendChild(input)
    input.setAttribute("value", content)
    input.select()
    if (document.execCommand("copy")) {
        document.execCommand("copy")
    }
    document.body.removeChild(input)
  }
}
