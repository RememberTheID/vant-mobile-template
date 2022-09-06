import * as vue from 'vue'

/**
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, delay = 300, immediate = true) {
  let timer
  let callNow = true
  return function() {
    const context = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      if (callNow) func.apply(context, args) // 触发事件立即执行
      callNow = false
      timer = setTimeout(() => {
        callNow = true // 过n秒后才能再次触发函数执行。
      }, delay)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, delay)
    }
  }
}

/**
 * @param {Function} func
 * @param {number} delay
 * @return {*}
 */
export function throttle(func, delay = 16) {
  let timeout
  let previous = 0
  return function(...args) {
    const context = this
    const now = new Date().getTime()
    // 距离下次函数执行的剩余时间
    const remaining = delay - (now - previous)
    // 如果无剩余时间或系统时间被修改
    if (remaining <= 0 || remaining > delay) {
      // 如果定时器还存在则清除并置为null
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      // 更新对比时间戳并执行函数
      previous = now
      func.apply(context, args)
    } else if (!timeout) {
      // 如果有剩余时间但定时器不存在，则设置定时器
      // remaining毫秒后执行函数、更新对比时间戳
      // 并将定时器置为null
      timeout = setTimeout(() => {
        previous = new Date().getTime()
        timeout = null
        func.apply(context, args)
      }, remaining)
    }
  }
}

export function dateDiff(hisTime, nowTime) {
  /**
   * [dateDiff 算时间差]
   * @param  {[type=Number]} hisTime [历史时间戳，必传]
   * @param  {[type=Number]} nowTime [当前时间戳，不传将获取当前时间戳]
   * @return {[string]}         [string]
   */
  var now = nowTime || new Date().getTime()
  var diffValue = now - hisTime
  var result = ''
  var minute = 1000 * 60
  var hour = minute * 60
  var day = hour * 24
  // var halfamonth = day * 15
  var month = day * 30
  var year = month * 12
  var _year = diffValue / year
  var _month = diffValue / month
  var _week = diffValue / (7 * day)
  var _day = diffValue / day
  var _hour = diffValue / hour
  var _min = diffValue / minute

  if (_year >= 1) result = parseInt(_year) + '年前'
  else if (_month >= 1) result = parseInt(_month) + '个月前'
  else if (_week >= 1) result = parseInt(_week) + '周前'
  else if (_day >= 1) result = parseInt(_day) + '天前'
  else if (_hour >= 1) result = parseInt(_hour) + '个小时前'
  else if (_min >= 1) result = parseInt(_min) + '分钟前'
  else result = '刚刚'
  return result
}
export function isIOS() {
  const ua = window.navigator.userAgent
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export function isWX() {
  const ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) === 'micromessenger'
}

export function setStorage(value, key = 'h5token') {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getStorage(key = 'h5token') {
  const value = localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.log('error')
  }
}

export function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
  if (timestamp == null) timestamp = Number(new Date())
  timestamp = parseInt(timestamp)
  if (timestamp.toString().length === 10) timestamp *= 1000
  const date = new Date(timestamp)
  let ret
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString(), // 秒
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}
export function getQuery(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r != null) return decodeURI(r[2])
  return null // 返回参数值
}

export function scrollBottom() {
  const list = document.querySelector('#message-list')
  if (!list) return
  vue.nextTick(() => {
    list.scrollTop = list.scrollHeight
  })
}

export function jsonParse(json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    return json
  }
}
