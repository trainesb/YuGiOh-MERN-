export function getAllCardSets() {
  return fetch('/api/allCardSets')
    .then(response => {return response.json()})
    .then(data => {return data})
}

export function getAllSetsByCategoryId(category_id) {
  return fetch('/api/setByCategory/' + category_id)
    .then(response => {return response.json()})
    .then(data => {return data})
}

export function getSetCardsBySetId(set_id) {
  return fetch('/api/set/' + set_id)
    .then(response => {return response.json()})
    .then(data => {return data})
}

export function getSetCardsBySetCode(set_code) {
  return fetch('/api/set/setcode/' + set_code)
    .then(response => {return response.json()})
    .then(data => {return data})
}
