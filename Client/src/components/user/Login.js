import React, { useState, useContext } from 'react'
import { AuthContext } from "../../App"

const Login = () => {
  const { dispatch } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const headers = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }
    fetch('/api/auth/signin', headers)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data.accessToken !== null) {
          sessionStorage.setItem('accessToken', data.accessToken)
          dispatch({type: "LOGIN", payload: data})
          window.location.assign('/')
        } else {
          alert('Login Failed!')
        }
      })
  }


  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Username</label>
          <input type="text" onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="form-item">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
}
export default Login
