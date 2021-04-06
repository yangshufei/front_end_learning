Promise.myRace = function (promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(item => {
      Promise.resolve(item).then(val => {
        resolve(val)
      }).catch(err => {
        reject(err)
      })
    })
  })
}


const request = (data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.8) {
      resolve(data)
    } else {
      reject(new Error(data))
    }
  }, 2000 * Math.random())
})

Promise.myRace([request(1), request(2), request(3)]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})