// User Data reducer file

import { TOKEN_NAME } from "../../configs/_storage"
import { UserAction } from "../action-types/User"
import { user_state_type } from "../types/reducerStateTypes"


const initState: user_state_type = {
  isLoading: false,
  isAuthed: false,
  UserData: null
}

export default (state = initState, action: UserAction) => {
  switch (action.type) {
    // case '':
    case 'TRY_LOAD_USER':
      return {
        ...state,
        isLoading: true
      }
    case 'AUTH_FAIL':
      window.localStorage.removeItem(TOKEN_NAME)
      window.location.href = '/signin'   // auth failed - go to signin
      return {
        ...state,
        isLoading: false,
        isAuthed: false
      }
    case 'LOAD_USER_SUCCESS':
      return {
        // ...state,
        isLoading: false,
        isAuthed: true,
        UserData: action.payload.UserData
      }
    default:
      return state
  }
}