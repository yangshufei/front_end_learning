// function compose(...fn) {
//   if (!fn.length) return (v) => v;
//   if (fn.length === 1) return fn[0];
//   return fn.reduce((pre, cur) =>{
//     return (...args) => {  // 1, 5, 8
//       return pre(cur(...args))
//     }
//   })
// }

function compose(...fn) {
  if (!fn.length) return (v) => v
  return function (num) { 
    return fn.reduce((total, curFn) => { 
      return curFn(total) 
    },num) 
  } 
}

// function compose(...arr) {
//   return function funArr(num) {
//     let sum = num || 0
//     for (let fn of arr) {
//       sum = sum + fn(0);
//     }
//     return sum;
//   };
// }

// 用法如下:
function fn1(x) {
  console.log(x, 1)
  return x + 1;
}
function fn2(x) {
  console.log(x, 2)
  return x + 2;
}
function fn3(x) {
  console.log(x, 3)
  return x + 3;
}
function fn4(x) {
  console.log(x, 4)
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
