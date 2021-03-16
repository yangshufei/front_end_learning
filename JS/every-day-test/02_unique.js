// 给定一个任意数组，实现一个通用函数，让数组中的数据根据 key 排重：

const dedup = (data, getKey = () => {} ) => {
  let m = new Map()
  data.forEach(item => {
    let key = getKey(item)
    if(!Array.isArray(key)) key = [key]
    key = key.map(i => JSON.stringify(i)).join(',')
    if(!m.has(key)) m.set(key, item)
  })
  return [...m.values()]
}
let data = [
  { id: 1, v: 1 },
  { id: 2, v: 2 },
  { id: 1, v: 1 },
];
console.log(dedup(data, item => [item.v]))
// 以 id 作为排重 key，执行函数得到结果
// data = [
//   { id: 1, v: 1 },
//   { id: 2, v: 2 },
// ];


const dedup1 = (arr, getKey = ()=> {}) => {
  const result = []
  const map = {}
  arr.forEach(item => {
    const key = getKey(item)
    if (!map[key]) {
      result.push(item)
      map[key] = true
    }
  })
  return result
}
let data1 = [
  { id: 1, v: 1, id1: 1 },
  { id: 2, v: 2, id1: 2 },
  { id: 1, v: 1, id1: 1 },
]
console.log(dedup1(data1, item => `${item.id}-${item.id1}`))
// 以 id 和 id1 作为排重 key，执行函数得到结果
// data1 = [
//   { id: 1, v: 1, id1: 1 },
//   { id: 2, v: 2, id1: 2 },
// ];


