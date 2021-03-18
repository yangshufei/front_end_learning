// 页面上有三个按钮，分别为 A、B、C，点击各个按钮都会发送异步请求且互不影响，每次请求回来的数据都为按钮的名字。
// 请实现当用户依次点击 A、B、C、A、C、B 的时候，最终获取的数据为 ABCACB。

// 这道题目主要两个考点：

// 请求不能阻塞，但是输出可以阻塞。比如说 B 请求需要耗时 3 秒，其他请求耗时 1 秒，那么当用户点击 BAC 时，三个请求都应该发起，但是因为 B 请求回来的慢，所以得等着输出结果。
// 如何实现一个队列？
// 其实我们无需自己去构建一个队列，直接利用 promise.then 方法就能实现队列的效果了。

class Queue {
  promise = Promise.resolve();

  excute(promiseFn) {
    this.promise = this.promise.then(() => promiseFn);
    return this.promise;
  }
}

const queue = new Queue();

const delay = (params) => {
  const time = Math.floor(Math.random() * 5);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(params);
    }, time * 500);
  });
};

const handleClick = async (name) => {
  const res = await queue.excute(delay(name));
  console.log(res);
};

handleClick('A');
handleClick('B');
handleClick('C');
handleClick('A');
handleClick('C');
handleClick('B');