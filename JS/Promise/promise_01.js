// 同步操作
function PromiseFirst(executor) {
  const that = this
  this.status = 'pending'
  this.value = null
  this.reason = null

  function resolve(value) {
    if (that.status === 'pending') {
      that.status = 'success'
      that.value = value
    }
  }

  function reject(reason) {
    if (that.status === 'pending') {
      that.status = 'reject'
      that.reason = reason
    }
  }

  executor(resolve, reject)
}

PromiseFirst.prototype.then =  function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
  if (this.status === 'success') {
    onFulfilled(this.value)
  }
  if (this.status === 'reject') {
    onRejected(this.reason)
  }
}

new PromiseFirst((reslove, reject) => {
  reslove(111)
  reject(new Error('错误'))
}).then(data=> console.log(data), error => console.log(error))

new PromiseFirst((reslove, reject) => {
  reject(new Error('错误'))
  reslove(111)
}).then(data=> console.log(data), error => console.log(error))

// 异步操作
new PromiseFirst((reslove, reject) => {
  setTimeout(() => {
    reslove('setTimeout')
  }, 1)
}).then(data => console.log(data))  // 啥都没有输出

// 因为setTimeout的关系resolve方法被放入了执行队列中的，
// 而then的逻辑是同步的，那么在执行then方法的时候，
// this.status的状态还是在pending.
// 如何解决呢，我们可以在then方法内加入status为pending的逻辑，把传入的函数先存到一个数组中，将它放到resolve或者reject方法中执行
