Promise.All = function (arg) {
  if (!Array.isArray(arg)) {
      return Promise.reject(new Error('参数必须是数组'))
  }
  return new Promise((resolve, reject) => {
      let count = 0;
      const totalCount = arg.length
      const results = []

      arg.forEach((item, index) => {
          const ret = item?.then ? item : Promise.resolve(item)
          ret.then(result => {
              count++
              results[index] = result
              if (count === totalCount) {
                  resolve(results)
              }
          }).catch(error => {
              reject(error)
          })
      })
  })
}

const request = (data) => new Promise((resolve, reject) => {
  setTimeout(() => {
      if (Math.random() < 0.9) {
          resolve(data)
      } else {
          reject(data)
      }
  }, 2000 * Math.random());
})

Promise.All([1, 2, 3, request(4)]).then(ret => {
  console.log("ret2", ret)
}).catch(error => {
  console.error("error2", error)
})
// ret2 (4) [1, 2, 3, 4]


Promise.All(new Array(10).fill(null).map((e, i) => request(i))).then(ret => {
  console.log("ret", ret)
}).catch(error => {
  console.error("error", error)
})
// ret (10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]