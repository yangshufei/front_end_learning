// 有一个嵌套层次很深的对象，key 都是 a_b 形式 ，需要改成 ab 的形式，注意不能用递归。
const a = {
  a_y: {
    a_z: {
      y_x: 6,
    },
    b_c: 1,
    c_x: {
      c_y: {
        c_z: 4
      }
    }
  },
};

// dfs 递归
// function formatKeyDFS(item) {
//   if (!item) return;
//   for (let key in item) {
//     console.log("key: ", key);
//     if (typeof item[key] === "object" && item[key] !== null) {
//       formatKeyDFS(item[key]);
//     }
//     let newKey = key.replace(/_/, "");
//     item[newKey] = item[key];
//     delete item[key];
//   }
//   return item;
// }

// dfs 深度优先遍历 非递归
function formatKeyDFS2(obj) {
  let stack = [obj];
  while (stack.length) {
    let item = stack.pop();
    for (let key in item) {
      if (typeof item[key] === "object" && item[key] !== null) {
        stack.push(item[key]);
      }
      let newKey = key.replace(/_/, "");
      item[newKey] = item[key];
      delete item[key];
    }
  }
  return obj;
}
console.log(formatKeyDFS2(a));

// bfs 广度优先遍历
// function formatKeyBFS(obj) {
//   let queue = [obj];
//   while (queue.length) {
//     let item = queue.shift();
//     for (let key in item) {
//       console.log("key: ", key);
//       if (typeof item[key] === "object" && item[key] !== null) {
//         queue.push(item[key]);
//       }

//       let newKey = key.replace(/_/, "");
//       item[newKey] = item[key];
//       delete item[key];
//     }
//   }
//   return obj;
// }

// console.log(formatKeyBFS(a));