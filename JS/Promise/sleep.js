
// 某个时间过后，就去执行某个函数，基于Promise封装异步任务。
// await后面的代码都会放到微任务队列中去异步执行。

/**
 * 
 * @param {*} fn 要执行的函数
 * @param {*} wait 等待的时间
 */
function sleep(wait) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, wait)
  })
}

let sayHello = (name) => console.log(`hello ${name}`);

async function autoRun() {
  await sleep(3000);
  let demo1 = sayHello('时光屋小豪');
  let demo2 = sayHello('掘友们');
  let demo3 = sayHello('公众号的朋友们');
};

autoRun();