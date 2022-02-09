// Error actions file
import axios from 'axios';
import { AuthActions, Auth_ActionType } from '../types/actionTypes';
import { setFeedback } from './UI_Actions';


/** Action Creators props */

// UserLoading Action Creator - props
type userLoading__props = {
  (): {
    type: Auth_ActionType['type']
  }
}
// UserLoaded Action Creator - props
type userLoaded__props = {
  (token: string): Auth_ActionType
}
// AuthError Action Creator - props
type authError__props = {
  (): {
    type: Auth_ActionType['type']
  }
}
// SignIn Action - props
type signIn__props = {
  (email: string, password: string): void
}


/** Action Creators */

// UserLoading Action Creator
const _userLoading: userLoading__props = () => ({ type: 'USER_LOADING' })

// UserLoading Action Creator
const _userLoaded: userLoaded__props = (token) => ({
  type: 'USER_LOADED',
  payload: { token, user: null }
})

// AuthError Action Creator
const _authError: authError__props = () => ({ type: 'AUTH_ERROR' })


// LoadUser Action
export const loadUser = () => async (dispatch: any) => {
  // Check token & load user
  // User is loading
  dispatch(_userLoading())

  // Get token form localstorage
  const token = localStorage.getItem('auth-token') ?? ""

  // Headers
  const headers = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": token
    }
  }

  try {
    const res = await axios.get('/api/auth/user', headers)
    dispatch(_userLoaded(token))  // set token
  }
  catch (err: any) {
    dispatch(_authError())
  }
}

// SignIn Action
export const signIn: signIn__props = (email, password) => async (dispatch: any) => {
  try {
    const res = await axios.post('/api/auth/signin', { email, password })
    dispatch(setFeedback(true, null))   // feedback - success
    dispatch(_userLoaded(res.data.token))
    
  }
  catch (err: any) {
    dispatch(setFeedback(false, err.response.data))   // feedback - error
  }
}
