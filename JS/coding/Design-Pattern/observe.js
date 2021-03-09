class Student {
  constructor(name) {
    this.name = name
    this.state = '开心'
    this.observers = []
  }
  attach(o) {
    this.observers.push(o)
  }
  setState(newState) {
    this.state = newState
    this.observers.forEach(o => {o.update(this)})
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }
  update(student) {
    console.log(this.name + '观察到' + student.name + student.state)
  }
}

const meiLi = new Student('美丽')
const mon = new Observer('妈妈')
const father = new Observer('爸爸')

meiLi.attach(mon)
meiLi.attach(father)
meiLi.setState('不开心')

