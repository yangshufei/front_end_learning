

const station = {
  'AB': 5,
  'BC': 4
}

function routeTime(r) {
  const route = r.replace(/-/g, '')
  const len = route.length
  let total = 0
  for (let i = 0; i < len-1; i++) {
    if (station[route[i] + route[i+1]]) {
      total += station[route[i] + route[i+1]]
    } else {
      total = 'NO Such Route'
      break
    }
    
  }
  return total
}


console.log(routeTime('A-B-C'))

