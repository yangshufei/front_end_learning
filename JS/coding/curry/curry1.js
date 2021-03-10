// 柯理化函数含义： 是给函数分步传递参数，每次传递部分参数，并返回一个更具体的函数接收剩下的参数，
// 这中间可嵌套多层这样的接收部分参数的函数，直至返回最后结果。


// add的参数不固定，看有几个数字累计相加
function add (a,b,c,d) {
  return a+b+c+d
}

function currying (fn, ...args) {
  // fn.length 回调函数的参数的总和
  // args.length currying函数 后面的参数总和 
  // 如：add (a,b,c,d)  currying(add,1,2,3,4)
  if (fn.length === args.length) {  
    return fn(...args)
  } else {
    // 继续分步传递参数 newArgs 新一次传递的参数
    return function(...newArgs) {
      // 将先传递的参数和后传递的参数 结合在一起
      let allArgs = [...args, ...newArgs]
      return currying(fn, ...allArgs)
    }
  }
}

let fn = currying(add, 1, 2) // [Function]

let fn2 = fn(3, 4)  // 10
let fn3 = fn(4, 5)  // 12

console.log(fn,fn2,fn3)