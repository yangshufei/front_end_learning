// setTimeout 实现 setInterval

function mySetTimeout(fn, t) {
  let timer = null
  function interval() {
    fn()
    timer = setTimeout(interval, t)
  }
  interval()
  return {
    cancel:()=>{
      clearTimeout(timer)
    }
  }
}
let a=mySetTimeout(()=>{
  console.log(111)
},1000)

