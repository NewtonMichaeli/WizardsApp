// User Auth Reducer

import { AuthAction } from '../action-types/Auth'
import { auth_state_type } from '../types/reducerStateTypes'
// Storage configs - token
import { TOKEN_NAME } from '../../configs/_storage'


const initState: auth_state_type = {
  token: localStorage.getItem(TOKEN_NAME),
  isAuthed: null,
  isLoading: false
}

export default (state = initState, action: AuthAction) => {
  switch (action.type) {
    // Get user data on success
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem(TOKEN_NAME, action.payload.token)  // insert token to localStorage
      window.location.href = "/"
      return {
        ...state,
        isAuthed: true,
        isLoading: false,
        token: action.payload.token
      }
    // Handle errors
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        token: null,
        isAuthed: false,
        isLoading: false,
      }
    case 'AUTH_FAIL':
      window.localStorage.removeItem(TOKEN_NAME)
      if (window.location.pathname !== '/')
        // -- auth failed - go to signin
        window.location.href = '/'        
      return state
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem(TOKEN_NAME)   // remove token from localStorage
      window.location.href = '/'
      return state
    case 'ADMIN_AUTH_FAIL':
      window.location.href = '/'
      return state
    case 'CREATE_WIZARD_CREATOR_SUCCESS':
      window.location.href = '/dashboard'
      return state
    default:
      return state
  }
}