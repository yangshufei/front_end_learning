// 异步请求通过 Promise.all 处理，怎么让其中失败的所有请求重试。
// Promise.all([A, B, C, D])
// 4 个请求完成后发现 AD 请求失败了，如果让 AD 请求重试

// let rejarr = [];
// const httprequest = function (type, time) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             Math.random() * 1000 > time
//                 ? resolve(type)
//                 : reject({ type, time });
//         }, time);
//     }).catch((rej) => {
//         rejarr.push(httprequest(rej.type, rej.time));
//     });
// };
// let p1 = httprequest("A", Math.random() * 1000);
// let p2 = httprequest("B", Math.random() * 1000);
// let p3 = httprequest("C", Math.random() * 1000);
// let p4 = httprequest("D", Math.random() * 1000);

// let all = (arr) => {
//     Promise.all(arr).then((res) => {
//       console.log(res)
//         if (rejarr.length) {
//             all(rejarr);
//             rejarr = [];
//         }
//     });
// };
// all([p1, p2, p3, p4])



const requestInterface =
  (name, time, isSuccess) =>
  new Promise((resolve, reject) => {
    setTimeout((name) => {
      isSuccess ? resolve(name) : reject()
    }, time, name)
  }).catch(err => requestInterface(name, time, true))

const A = requestInterface('A', 500, false)

const B = requestInterface('B', 1000, true)

const C = requestInterface('C', 1500, true)

const D = requestInterface('D', 800, false)


Promise.all([A, B, C, D])
  .then((params) => void console.log('成功', params))
  .catch(error => void console.log('失败', error))



// function http(value, flag){
//   return new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//       if(Math.random() < 0.5){ // 设定一个成功或者失败的条件
//         resolve(value)
//         console.log(flag?'重新请求成功':'第一次请求成功',value)
//       }else{
//         console.log(flag?'重新请求失败':'第一次请求失败',value)
//         resolve(http(value,true))
//       }
//     }, Math.random()*2000)
//   })
// }
// let A = http('A');
// let B = http('B');
// let C = http('C');
// let D = http('D');

// Promise.all([A,B,C,D]).then(res=>{
//   console.log('成功',res)
// })