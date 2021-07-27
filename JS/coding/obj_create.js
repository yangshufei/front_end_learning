Object.create() = function create(prototype) {
  // 排除传入的对象是 null 和 非object的情况
 if (prototype === null || typeof prototype !== 'object') {
    throw new TypeError(`Object prototype may only be an Object: ${prototype}`);
 }
  // 让空对象的 __proto__指向 传进来的 对象(prototype)
  // 目标 {}.__proto__ = prototype
  function Temp() {};
  Temp.prototype = prototype;
  return new Temp;
}