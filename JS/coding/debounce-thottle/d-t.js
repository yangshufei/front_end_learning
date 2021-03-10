function debounce (func, wait) {
  let timer = null
  return function (...args) {
    if (timer !== null) clearTimeout(timer)

    timer = setTimeout(()=> {
      timer = null
      func.apply(this, args)
    }, wait)
  }
}

function throttle (func, wait) {
  let timer = null
  return function(...args) {
    if (!timer) {
      timer = setTimeout(()=> {
        func.apply(this, args)
        timer = null
      },wait)
    }
  }
}