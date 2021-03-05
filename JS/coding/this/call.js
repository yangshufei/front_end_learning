// 简易版（不考虑context非对象情况，不考虑Symbol\BigInt 不能 new.constructor( context )情况）

/**
 * context: 要改变的函数中的this指向，写谁就是谁
 * args：传递给函数的实参信息
 * this：要处理的函数 fn
 */
Function.prototype.myCall = function(context, ...args) {
  //  null，undefined，和不传时，context为 window
  context = context == null ? window : context;
   
  let result;
  context['fn'] = this; // 把函数作为对象的某个成员值
  result = context['fn'](...args); // 把函数执行，此时函数中的this就是
  delete context['fn']; // 设置完成员属性后，删除
  return result;
}


// 完善版（context必须对象类型，兼容Symbol等情况）

/**
 * context: 要改变的函数中的this指向，写谁就是谁
 * args：传递给函数的实参信息
 * this：要处理的函数 fn
 */
Function.prototype._call = function(context, ...args) {
  //  null，undefined，和不传时，context为 window
  context = context == null ? window : context;
   
   // 必须保证 context 是一个对象类型
  let contextType = typeof context;
  if (!/^(object|function)$/i.test(contextType)) {
    // context = new context.constructor(context); // 不适用于 Symbol/BigInt
    context = Object(context);
  }
   
  let result;
  context['fn'] = this; // 把函数作为对象的某个成员值
  result = context['fn'](...args); // 把函数执行，此时函数中的this就是
  delete context['fn']; // 设置完成员属性后，删除
  return result;
}


var person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
var person1 = {
  firstName:"John",
  lastName: "Doe"
}

console.log(person.fullName._call(person1, "Oslo", "Norway"))