function _instanceof (instanceObject, classFunc) {
  let classFunc = classFunc.prototype; // 取得当前类的原型
  let proto = instanceObject.__proto__; // 取得当前实例对象的原型链
   
  while (true) {
    if (proto === null) { // 找到了 Object的基类 Object.prototype.__proto__
      return false;
    };
    if (proto === classFunc) { // 在当前实例对象的原型链上，找到了当前类
      return true;
    }
    proto = proto.__proto__; // 沿着原型链__ptoto__一层一层向上查找
  }
}

//  优化版 (处理兼容问题)
// Object.getPrototypeOf：用来获取某个实例对象的原型（内部[[prototype]]属性的值，包含proto属性）

function _instanceof (instanceObject, classFunc) {
  let classFunc = classFunc.prototype; // 取得当前类的原型
  let proto = Object.getPrototypeOf(instanceObject); // 取得当前实例对象的原型链上的属性
   
  while (true) {
    if (proto === null) { // 找到了 Object的基类 Object.prototype.__proto__
      return false;
    };
    if (proto === classFunc) { // 在当前实例对象的原型链上，找到了当前类
      return true;
    }
    proto = Object.getPrototypeOf(proto); // 沿着原型链__ptoto__一层一层向上查找
  }
}