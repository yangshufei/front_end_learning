/**
  * Func: 要操作的类（最后要创建这个类的实例）
  * args：存储未来传递给Func类的实参
  */
 function _new(Func, ...args) {
  
  // 创建一个Func的实例对象（实例.____proto____ = 类.prototype）
  let obj = {};
  obj.__proto__ = Func.prototype;
  
  // 把Func当做普通函数执行，并改变this指向
  let result = Func.call(obj, ...args);
  
  // 分析函数的返回值
  if (result !== null && /^(object|function)$/.test(typeof result)) {
    return result;
 }
  return obj;
}


// 优化版
function _new(Func, ...args) {
  
  // let obj = {};
  // obj.__proto__ = Func.prototype;
  // 创建一个Func的实例对象（实例.____proto____ = 类.prototype）
  let obj = Object.create(Func.prototype);
  
  // 把Func当做普通函数执行，并改变this指向
  let result = Func.call(obj, ...args);
  
  // 分析函数的返回值
  if (result !== null && /^(object|function)$/.test(typeof result)) {
    return result;
  }
  return obj;
}