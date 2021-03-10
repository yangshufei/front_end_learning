// 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
class Events {
  constructor() {
    this.cache = {}
    this.oneCache = {}
  }
  on (name, fn, ...args) {
    if (this.cache[name]) {
      this.cache[name].push(fn.bind(this, ...args))
    } else {
      this.cache[name] = [fn.bind(this, ...args)]  // 使用bind返回一个函数，可以继续传参
    }
  }
  emit(name, ...args) {
    if (this.cache[name]) {
      this.cache[name].forEach(fn => fn(...args))
    }
    if (this.oneCache[name]) {
      this.oneCache[name]()
      delete this.oneCache[name]
    }
  }
  off(name, fn) {
    if (this.cache[name]) {
      this.cache[name] = this.cache[name].filter(f => {
        return !f.name.includes(fn.name)
      })
    }
  }
  once(name, fn) {
    this.oneCache[name] = fn
  }
}


// 请使用原生代码实现一个Events模块，可以实现自定义事件的订阅、触发、移除功能
const fn1 = (...args) => console.log("I want sleep1", ...args);
const fn2 = (...args) => console.log("I want sleep2", ...args);
const events = new Events();
events.on("sleep", fn1, 1, 2, 3);
events.on("sleep", fn2, 1, 2, 3);
events.emit("sleep", 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
events.off("sleep", fn1);
events.once("sleep", () => console.log("I want sleep"));
events.emit("sleep");
// I want sleep2 1 2 3
// I want sleep
events.emit("sleep");
// I want sleep2 1 2 3