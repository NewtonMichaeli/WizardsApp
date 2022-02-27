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
      // window.location.href = "/dashboard"   // redirect to dashboard
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
    case 'LOGOUT_SUCCESS':
      localStorage.removeItem(TOKEN_NAME)   // remove token from localStorage
      window.location.href = '/signin'
      return state
    default:
      return state
  }
}