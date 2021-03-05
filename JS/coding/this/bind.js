/**
 * this: 要处理的函数 func
 * context: 要改变的函数中的this指向 obj
 * params：要处理的函数传递的实参 [10, 20]
 */
Function.prototype._bind = function(context, ...params) {
  
  let _this = this; // this: 要处理的函数
  return function anonymous (...args) {
    // args： 可能传递的事件对象等信息 [MouseEvent]
    // this：匿名函数中的this是由当初绑定的位置 触发决定的 （总之不是要处理的函数func）
    // 所以需要_bind函数 刚进来时，保存要处理的函数 _this = this
    _this.call(context, ...params.concat(args));
  }
}


var person = {
  fullName: function(city, country) {
    console.log(this.firstName + " " + this.lastName + "," + city + "," + country)
  }
}
var person1 = {
  firstName:"John",
  lastName: "Doe"
}

const func = person.fullName._bind(person1, "Oslo", 'Norway')
func()


Array.prototype.myBind = function(context, ...params) {
  context = context == null ? window : context
  const _this = this
  return function (...args) {
    _this.call(context, ...params.concat(args))
  }
}