import React, { useState } from 'react'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const headers = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        role: role
      })
    }
    fetch('/api/auth/signup', headers)
      .then(response => response.json())
      .then(data => console.log(data))
  }


  return (
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-item">
          <label>Username</label>
          <input type="text" onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Email</label>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="form-item">
          <label>Role</label>
          <select type="text" onChange={(e)=>setRole(e.target.value)}>
            <option label="--select--" value="" />
            <option label="User" value="user" />
            <option label="Admin" value="admin" />
            <option label="Moderator" value="moderator" />
          </select>
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="form-item">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  )
}
export default Signup
