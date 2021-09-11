function test (a,b) {
  b = a + 10
  alert(b)
  return {
    test: function(a,b) {
      return test(b,a)
    }
  }
}
var c = test(102).test(202, 302)  //112 312
c.test() // NaN

var b = test(101).test(201).test(401) // 111 NaN NaN

var a = test(100, 200)  //110
a.test(300) // NaN
a.test(400) // NaN