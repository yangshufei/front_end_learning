class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  emit(eventName) {
    this.events[eventName].forEach(fn => {
      fn()
    })
  }
}

const events = new EventEmitter()

events.on('work', ()=> {
  console.log('work')
})
events.on('work', ()=> {
  console.log('work1')
})

events.emit('work')