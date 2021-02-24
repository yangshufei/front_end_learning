// 加入异步操作
function PromiseSecond(executor) {
  const that = this
  this.status = 'pending'
  this.value = null
  this.reason = null
  this.onSuccessCallback = []
  this.onRejectCallback = []

  function resolve(value) {
    if (that.status === 'pending') {
      that.status = 'success'
      that.value = value
      that.onSuccessCallback.forEach(func => {
        func(value)
      })
    }
  }
  function reject(reason) {
    if (that.status === 'pending') {
      that.status = 'reject'
      that.reason = reason
      that.onRejectCallback.forEach(func => {
        func(reason)
      })
    }
  }

  executor(resolve, reject)
}

PromiseSecond.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error}

  if (this.status === 'success') {
    onFulfilled(this.value)
  }
  else if (this.status === 'reject') {
    onRejected(this.reason)
  }
  else if (this.status === 'pending') {
    this.onSuccessCallback.push(onFulfilled)
    this.onRejectCallback.push(onRejected)
  }
}

new PromiseSecond((reslove, reject) => {
  setTimeout(() => {
    reslove(222)
  }, 1)
}).then(data => console.log(data))