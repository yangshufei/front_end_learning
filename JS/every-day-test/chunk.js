// _.chunk(['a', 'b', 'c', 'd'], 2)
// => [['a', 'b'], ['c', 'd']]
// _.chunk(['a', 'b', 'c', 'd'], 3)
// => [['a', 'b', 'c'], ['d']]
// _.chunk(['a', 'b', 'c', 'd'], 5)
// => [['a', 'b', 'c', 'd']]
// _.chunk(['a', 'b', 'c', 'd'], 0)
// => []

let _ = {}
_.chunk = function(arr, size) {
  if (arr.length == 0 || !size) return []
  if (arr.length <= size) return arr
  const result = []
  let start = 0
  while(start < arr.length) {
    result.push(arr.slice(start,start + size))
    start += size
  }
  return result
}


_.chunk1 = function(arr, len) {
  if (len === 0) return []
  return arr.reduce((prev, item, index) => {
    const value = Math.floor(index / len),   // 0/2=0  1/2=0  2/2=1  3/2=1  Math.floor() 向下兼容
      remainder = index % len                // 0%2=0  1%2=1  2%2=0  3%2=1  是否整除
    remainder === 0 ? prev.push([item]) : prev[value].push(item)
    return prev
  }, [])
}


_.chunk2 = function(arr, size) {
  return arr.reduce((acc, cur, index) => {
    index % size === 0 ? acc.push([cur]) : acc[acc.length - 1] && acc[acc.length - 1].push(cur)
    return acc
  }, [])
}

console.log(_.chunk(['a', 'b', 'c', 'd'], 2))
// => [['a', 'b'], ['c', 'd']]
console.log(_.chunk(['a', 'b', 'c', 'd'], 3))
// => [['a', 'b', 'c'], ['d']]
console.log(_.chunk(['a', 'b', 'c', 'd'], 5))
// => [['a', 'b', 'c', 'd']]
console.log(_.chunk(['a', 'b', 'c', 'd'], 0))
// => []

console.log(_.chunk1(['a', 'b', 'c', 'd'], 2))
// => [['a', 'b'], ['c', 'd']]
console.log(_.chunk1(['a', 'b', 'c', 'd'], 3))
// => [['a', 'b', 'c'], ['d']]
console.log(_.chunk1(['a', 'b', 'c', 'd'], 5))
// => [['a', 'b', 'c', 'd']]
console.log(_.chunk1(['a', 'b', 'c', 'd'], 0))
// => []

console.log(_.chunk2(['a', 'b', 'c', 'd'], 2))
// => [['a', 'b'], ['c', 'd']]
console.log(_.chunk2(['a', 'b', 'c', 'd'], 3))
// => [['a', 'b', 'c'], ['d']]
console.log(_.chunk2(['a', 'b', 'c', 'd'], 5))
// => [['a', 'b', 'c', 'd']]
console.log(_.chunk2(['a', 'b', 'c', 'd'], 0))
// => []