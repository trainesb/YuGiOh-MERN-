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
