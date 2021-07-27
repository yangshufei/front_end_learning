// 所谓寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的形式来继承方法。
// 只调用了一次父类构造函数，效率更高。避免在子类.prototype上面创建不必要的、多余的属性，与其同时，原型链还能保持不变。

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
  return this.name;
}

function Child(name, age) {
  Parent.call(this, name); // 调用父类的构造函数，将父类构造函数内的this指向子类的实例
  this.age = age;
}

//寄生组合式继承
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.getAge = function () {
    return this.age;
}

let girl = new Child('Lisa', 18);
girl.getName();