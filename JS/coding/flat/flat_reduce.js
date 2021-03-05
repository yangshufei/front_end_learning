
let arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
];


const myFlat = arr => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? myFlat(cur) : cur);
  }, []);
};
console.log(myFlat(arr)); 
// [12, 23, 34, 56, 78, 90, 100, 110, 120, 130, 140]