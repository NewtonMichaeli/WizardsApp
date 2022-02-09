// User Auth Reducer

import { Auth_ActionType } from '../types/actionTypes'
import { auth_state_type } from '../types/reducerStateTypes'


const initState: auth_state_type = {
  token: localStorage.getItem('auth-token'),
  isAuthed: null,
  isLoading: false,
  user: null  // user-data: username, password
}

export default (state = initState, action: Auth_ActionType) => {
  switch (action.type) {
    // user is loading
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: true
      }
    // user was loaded
    case 'USER_LOADED':
      return {
        ...state, 
        isLoading: false,
        isAuthed: true,
        token: action.payload
      }
    // get user data on success
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('auth-token', action.payload.token)
      return {
        ...state,
        user: action.payload.user,   // currently is token:string
        isAuthed: true,
        isLoading: false,
        token: action.payload.token
      }
    // handle errors
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem('auth-token')
      return {
        ...state,
        token: null,
        isAuthed: false,
        isLoading: false,
        user: null
      }
    default:
      return state
  }
}