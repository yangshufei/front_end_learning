var a = 3
function change1(a1) {
  var a = a1
}
change1(5)
alert(a)   // 3

var user = {age:30}
function change2(user) {
  user.age = 40
}

change2(user)

alert(user.age)  // 40

function change3(user) {
  user = {age:50}
}

change3(user)
alert(user.age)  // 40