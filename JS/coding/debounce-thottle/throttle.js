// 假设近期我们有发放口罩 的爱心机制——每天早上8点发一个，
// 必须一天后口罩寿命到了戴完用掉了才能再来领新的。
// 24h内（wait）没用完丢弃前，你来领口罩（触发throttle）是不能给你发放的，
// 你反复几次来领都没用，看到你口罩还能用（timer为真）就劝退(不执行if语句)。
// 等24h时间到了后（setTimeout宏任务执行）口罩戴完了扔掉了（timer = null），
// 看到你脸上没口罩可用了（timer为假），
// 就才执行发放口罩动作（if语句内动作）。



/**
 * 实现函数的节流 （目的是频繁触发中缩减频率）
 * @param {*} func 需要执行的函数
 * @param {*} wait 检测节流的间隔频率
 * @param {*} immediate 是否是立即执行 True：第一次，默认False：最后一次
 * @return {可被调用执行的函数}
 */
function throttle(func, wait) {
  let timer = null
   let previous = 0  // 记录上一次操作的时间点
 
   return function anonymous(... params) {
     let now = new Date()  // 当前操作的时间点
     remaining = wait - (now - previous) // 剩下的时间
     if (remaining <= 0) {
       // 两次间隔时间超过频率，把方法执行
       
       clearTimeout(timer); // clearTimeout是从系统中清除定时器，但timer值不会变为null
       timer = null; // 后续可以通过判断 timer是否为null，而判断是否有 定时器
       
       // 此时已经执行func 函数，应该将上次触发函数的时间点 = 现在触发的时间点 new Date()
       previous = new Date(); // 把上一次操作时间修改为当前时间
       func.call(this, ...params);
     } else if(!timer){ 
       
       // 两次间隔的事件没有超过频率，说明还没有达到触发标准，设置定时器等待即可（还差多久等多久）
       // 假设事件间隔为500ms，第一次执行完之后，20ms后再次点击执行，则剩余 480ms，就能等待480ms
       timer = setTimeout( _ => {
         clearTimeout(timer)
         timer = null // 确保每次执行完的时候，timer 都清 0，回到初始状态
         
         //过了remaining时间后，才去执行func，所以previous不能等于初始时的 now
         previous = new Date(); // 把上一次操作时间修改为当前时间
         func.call(this, ...params)
       }, remaining)
     }
   }
 }
 
 function func() {
   console.log('ok')
 }
 btn.onclick = throttle(func, 500)


//  当高频事件触发时，第一次会立即执行（给scroll事件绑定函数与真正触发事件的间隔一般大于delay，如果你非要在网页加载1000毫秒以内就去滚动网页的话，我也没办法o(╥﹏╥)o），而后再怎么频繁地触发事件，也都是每delay时间才执行一次。
//  而当最后一次事件触发完毕后，事件也不会再被执行了
 const throttle1 = function (func, wait) {
   let prev = Date.now()
   return function () {
      const context = this
      const args = arguments
      const now  = Date.now()
      if (now - prev >= wait) {
        func.apply(context, args)
        prev = Date.now()
      }
   }
 }

 
//  当触发事件的时候，我们设置一个定时器，再次触发事件的时候，如果定时器存在，就不执行，直到delay时间后，定时器执行执行函数，并且清空定时器，这样就可以设置下个定时器。当第一次触发事件时，不会立即执行函数，而是在delay秒后才执行。而后再怎么频繁触发事件，也都是每delay时间才执行一次。
//  当最后一次停止触发后，由于定时器的delay延迟，可能还会执行一次函数。
 const throttle2 = function (func, wait) {
   let timer = null
   return function(...params) {
     if (!timer) {
       timer = setTimeout(()=> {
        func.apply(this, params)
        timer = null
       },wait)
     }
   }
 }