// 经典面试题
// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;


// 参数不固定，以最后（）结束
function add(...args) {
    let _args = args
    if (!args.length) return 0
    return function _add(...newArgs) {
        if (newArgs.length) {
            _args = [..._args, ...newArgs]
            return _add
        } else {
            return _args.reduce((acc, cur) => {
                return acc+cur
            }, 0)
        }
        
    }
}

console.log(add(1)(2)(3)())   // 6
console.log(add(1, 2, 3)(4)())    // 10
console.log(add(1)(2)(3)(4)(5)())   // 15
console.log(add(2, 6)(1)())      // 9
console.log(add(1)()) 
console.log(add())


