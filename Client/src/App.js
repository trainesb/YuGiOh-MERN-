import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Nav from './components/partials/Nav'

import Signup from './components/user/Signup'
import Login from './components/user/Login'

import Set from './components/set/Set'
import SetCards from './components/set/SetCards'
import Category from './components/category/Category'

import { getUserFromAccessToken } from './services/UserServices'

export const AuthContext = React.createContext()
const initialState = {
  isAuthenticated: false,
  username: null,
  email: null,
  userId: null,
  role: null,
  accessToken: null,
  cards: null,
}

const reducer = (state, action) => {
  switch(action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        email: action.payload.email,
        userId: action.payload.id,
        role: action.payload.roles[0],
        accessToken: action.payload.accessToken,
        cards: action.payload.cards
      }
    case "LOGIN_UPDATE":
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        email: action.payload.email,
        userId: action.payload._id,
        role: action.payload.roles[0].name,
        cards: action.payload.cards
      }
    case "LOGOUT":
      sessionStorage.removeItem('accessToken')
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        email: null,
        userId: null,
        role: null,
        accessToken: null,
        cards: null
      }
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  useEffect(() => {
    if(!state.isAuthenticated && sessionStorage.getItem('accessToken')) {
      state.isAuthenticated = true,
      state.accessToken = sessionStorage.getItem('accessToken')
      getUserFromAccessToken(state.accessToken).then(data => {
        console.log(data)
        if(!data.hasOwnProperty('username')) {
          dispatch({type: "LOGOUT"})
        } else {
          dispatch({type: "LOGIN_UPDATE", payload: data})
        }
      })
    }
  }, [])

  return(
    <AuthContext.Provider value={{state, dispatch}}>
      <Nav />

      <div className="body-wrapper">
        <div className="wrapper">
          <Routes>
            {!state.isAuthenticated &&
              <>
                <Route exact path='/login' element={<Login />} ></Route>
                <Route exact path='/register' element={<Signup />} ></Route>
              </>
            }

            <Route exact path='/' element={<Set />} ></Route>
            <Route exact path='/setcards/:setCode' element={<SetCards />}></Route>
            <Route exact path='/set/:id' element={<Set />} ></Route>
            <Route exact path='/category' element={<Category />} ></Route>

          </Routes>
        </div>
      </div>

    </AuthContext.Provider>
  )
}

export default App
