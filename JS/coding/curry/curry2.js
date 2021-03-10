// 1. 参数复用

// 正常正则验证字符串 reg.test(txt)

// 函数封装后
function check(reg, txt) {
  return reg.test(txt)
}

check(/\d+/g, 'test')       //false
check(/[a-z]+/g, 'test')    //true

// Currying后
function curryingCheck(reg) {
  return function(txt) {
      return reg.test(txt)
  }
}

var hasNumber = curryingCheck(/\d+/g)
var hasLetter = curryingCheck(/[a-z]+/g)

console.log(hasNumber('test1'))     // true
console.log(hasNumber('testtest'))   // false
console.log(hasLetter('21212'))      // false


// 上面的示例是一个正则的校验，正常来说直接调用check函数就可以了，
// 但是如果我有很多地方都要校验是否有数字，其实就是需要将第一个参数reg进行复用，
// 这样别的地方就能够直接调用hasNumber，hasLetter等函数，让参数能够复用，调用起来也更方便。
