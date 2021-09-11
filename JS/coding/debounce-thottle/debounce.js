// 假设电梯的安全机制为每人进门后1分钟（wait）后才有关门动作，
// 你第一个进电梯，快50秒的时候进来一位乘客（触发deBounce），
// 得，刚才的50秒白等啦（clearTimeout），
// 两人得一起重来再等新的1分钟。
// 刚过又30秒，上来另一位乘客（再次触发deBounce），
// 关门指令定时器又作废了（clearTimeout），
// 大家得重新等新的1分钟，这1分钟内没人进来（触发deBounce）的话，
// 那1分钟后关门动作就会执行了。


/**
 * 实现函数的防抖（目的是频繁触发中只执行一次）以最后一次触发为标准
 * @param {*} func 需要执行的函数
 * @param {*} wait 检测防抖的间隔频率
 * @param {*} immediate 是否是立即执行  True：第一次，默认False：最后一次
 * @return {可被调用执行的函数}
 */
function debounce(func, wait = 500) {
  let timer = null
  return function (...params) {
    if(timer !== null) clearTimeout(timer)
    timer = setTimeout(() => {
      // 在下一个500ms 执行func之前，将timer = null
      //（因为clearInterval只能清除定时器，但timer还有值）
      // 为了确保后续每一次执行都和最初结果一样，赋值为null
      // 也可以通过 timer 是否 为 null 是否有定时器
      timer = null
      func.call(this, ...params)
    }, wait)
  }
}


/**
 * 实现函数的防抖（目的是频繁触发中只执行一次）以第一次触发为标准
 * @param {*} func 需要执行的函数
 * @param {*} wait 检测防抖的间隔频率
 * @param {*} immediate 是否是立即执行 True：第一次，默认False：最后一次
 * @return {可被调用执行的函数}
 */
function debounce(func, wait = 500, immediate = true) {
  let timer = null
  return function anonymous(... params) {

    // 第一点击 没有设置过任何定时器 timer就要为 null
    let now = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(_ => {
      // 在下一个500ms 执行func之前，将timer = null
      //（因为clearInterval只能在系统内清除定时器，但timer还有值）
      // 为了确保后续每一次执行都和最初结果一样，赋值为null
      // 也可以通过 timer 是否 为 null 是否有定时器
      timer = null
      !immediate ? func.call(this, ...params) : null
    }, wait)
    now ? func.call(this, ...params) : null

  }
}

function func() {
  console. log('ok')
}
btn.onclick = debounce(func, 500)