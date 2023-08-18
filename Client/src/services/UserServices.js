export function getUserFromAccessToken(accessToken) {
  const headers = {
    method: 'GET',
    headers: new Headers({
      'X-Access-Token': accessToken,
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  return fetch('/api/user/token', headers)
    .then(response => {return response.json()})
    .then(data => {return data.user})
}


export function updateUserCards(accessToken, cards) {

  const headers = {
    method: 'POST',
    headers: new Headers({
      'X-Access-Token': accessToken,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cards)
  }

  return fetch('/api/user/cards', headers)
    .then(response => {return response.json()})
    .then(data => {return data.user})
    .catch(err => updateUserCards(accessToken, cards))
}
