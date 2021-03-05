/**
 * context: 要改变的函数中的this指向，写谁就是谁
 * args：传递给函数的实参信息 数组形式的参数
 * this：要处理的函数 fn
 */
Function.prototype.myApply = function(context, args) {

  context = context == null ? window : context;
  
  let contextType = typeof context;
  if (!/^(object|function)$/i.test(contextType)) {
    context = Object(context);
  }
  
  let result;
  context['fn'] = this; 
  result = context['fn'](...args); 
  delete context['fn'];
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

console.log(person.fullName.myApply(person1, ["Oslo", "Norway"]))