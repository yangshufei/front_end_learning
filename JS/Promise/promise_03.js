// promise链式调用

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function getResolveValue(promiseNext, result, resolve, reject) {
  if (result === promiseNext)
  return reject(new TypeError('不可返回同一个promise对象'))
  let mark //保证reslove和reject只调用一个
  if ((typeof result === 'object' && result != null) || (typeof result === 'function')) { //如果result（当次返回值）不是对象直接调用reslove
    try {
      let then  = result.then
      if (typeof then === 'function') {
        then.call(result, function(next) {// 如果next是promise继续递归解析
          if (mark) return
          mark = true 
          getResolveValue(promiseNext, next, resolve, reject) //next就是result的resolve值也就是上一次this.value
        },function(err) {
          if (mark) return
          mark = true
          reject(err)
        })
      } else { //不是函数，就是普通对象
        resolve(result)  //直接将对象返回
      }
    } catch (error) {
      if (mark) return
      reject(error)
    }
  } else { //x是普通值，直接走then的成功回调
    resolve(result)
  }
}

function PromiseThird(executor) {
  const that  = this
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  this.onSuccessCallback = []
  this.onRejectCallback = []

  function resolve(value) {
    if (value instanceof PromiseThird) {
      return value.then(resolve, reject)
    }
    if (that.status === PENDING) {
      that.status = FULFILLED
      that.value = value
      that.onSuccessCallback.forEach(func => {
        func(value)
      })
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED
      that.reason = reason
      that.onRejectCallback.forEach(func => {
        func(reason)
      })
    }
  }
    
  executor(resolve, reject)
}

PromiseThird.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function'  ? onFulfilled : data => data
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
  
  let promiseNext
  if (this.status === FULFILLED) {
    return promiseNext = new PromiseThird((resolve, reject) => {
      setTimeout(()=> {
        try {
          let result = onFulfilled(this.value)
          getResolveValue(promiseNext, result, resolve, reject)
        } catch(error) {
          reject(error)
        }
      })
    })
  }

  if (this.status === REJECTED) {
    return promiseNext = new PromiseThird((resolve,reject)=>{
      setTimeout(()=>{
        try {
          let result = onRejected(this.reason)
          getResolveValue(promiseNext, result, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
  if (this.status === PENDING) {
    return promiseNext = new PromiseThird((resolve,reject)=>{
      this.onSuccessCallback.push(value=>{
        try {
          let result = onFulfilled(value)
          getResolveValue(promiseNext, result, resolve, reject)
        } catch (error) {
          reject(error)
        }
      }) 
      this.onRejectCallback.push(reason => {
        try {
          let result = onRejected(reason)
          getResolveValue(promiseNext, result, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
}


new PromiseThird((resolve,_)=>{
  setTimeout(()=>{
    resolve('hello')
  },0)
}) //p1
.then((data) => { 
  console.log(data) 
  return new PromiseThird((resolve,_)=> {
    resolve(new PromiseThird((resolve,_)=> {
      resolve('hello JS')
    }))
  })
} ) //p2
.then(data => { 
  console.log(data) 
  return new PromiseThird((resolve,_)=> {
    resolve('hello TS')
  }) 
}) //p3
.then(data => console.log(data)) //p4



// Promise.prototype.catch

PromiseThird.prototype.catch = function(err) {
  return this.then(null,err)
}
new PromiseThird((resolve,reject) => {
  reject('错误')
}).catch(data => console.log(data))


// Promise.resolve && Promise.reject

PromiseThird.resolve = function(value) {
  return new PromiseThird((resolve, _) => {
    resolve(value)
  })
}
PromiseThird.reject= function(reason) {
  return new PromiseThird((_, reject) => {
    reject(reason)
  })
}


// Promise.all

PromiseThird.all = function(arr) {
  if(!Array.isArray(arr)){
      throw new TypeError('请传入一个数组')
  }
  return new PromiseThird((resolve, reject) => {
    try {
      let resultArr = []
      const length = arr.length
      for(let i = 0; i<length; i++) {
        arr[i].then(data => {
          resultArr.push(data)
          if(resultArr.length === length) {
            resolve(resultArr)
          }
        },reject)
      }
    } catch (error) {
      reject(error)
    }
  })
}

const p1 = new PromiseThird((resolve, _) => {
  setTimeout(()=>{
    resolve('p1')
  },1000)
})

const p2 = new PromiseThird((resolve, _) => {
  resolve('p2')
})
PromiseThird.all([p1,p2]).then(data=>console.log(data))// ['p2','p1']


// Promise.race

PromiseThird.race = function(arr) {
  if(!Array.isArray(arr)){
      throw new TypeError('请传入一个数组')
  }
  return new PromiseThird((resolve, reject) => {
    try {
      const length = arr.length
      for(let i = 0; i<length; i++){
        arr[i].then(resolve, reject)
      }
    } catch (error) {
      reject(error)
    }
  })
}
PromiseThird.race([p1,p2]).then(data=>console.log(data,'race')) // p2 race




