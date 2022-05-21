import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../../services/CategoryServices'
import { AuthContext } from "../../App"

const Nav = () => {
  const [categories, setCategories] = useState([])
  const { state, dispatch } = useContext(AuthContext)

  useEffect(() => {
    getAllCategories().then(cats => setCategories(cats))
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch({type: "LOGOUT"})
  }

  return (
    <nav className="nav-wrapper">
      <Link className="nav-link" to="/">All Sets</Link>
      {!state.isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
      {state.isAuthenticated && <div className="nav-link logout-link" onClick={handleLogout}>Logout</div>}


      {categories.length > 0 &&
        categories.map((category) => <Link className="nav-link" to={"/set/" + category._id}>{category.category}</Link>)
      }
    </nav>
  )
}
export default Nav
