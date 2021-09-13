// 浅克隆： 只拷贝对象或数组的第一层内容

const shallClone = (target) => {
  if (typeof target === 'object' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) { // 遍历对象自身可枚举属性（不考虑继承属性和原型对象）
        cloneTarget[prop] = target[prop];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}

const data = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4
  }
}

function isObj(target) {
  return typeof target === 'object' && target !== null
}

// 深克隆： 层层拷贝对象或数组的每一层内容
function deepClone(target)  {
  if (!isObj(target)) return target

  const cloneTarget = Array.isArray(target) ? [] : {};
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = isObj(target[prop]) ? deepClone(target[prop]) : target[prop];
    }
  }
  return cloneTarget;
}


// 手动实现一个深克隆(考虑日期/正则等特殊对象 和 解决循环引用情况)
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

function deepClone (target, map = new Map()) {
  // 先判断该引用类型是否被 拷贝过
  if (map.get(target)) {
    return target;
  }

  // 获取当前值的构造函数：获取它的类型
  let constructor = target.constructor;

  // 检测当前对象target是否与 正则、日期格式对象匹配
  if (/^(RegExp|Date)$/i.test(constructor.name)){
    return new constructor(target); // 创建一个新的特殊对象(正则类/日期类)的实例
  }

  if (isObject(target)) {
    map.set(target, true); // 为循环引用的对象做标记
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
