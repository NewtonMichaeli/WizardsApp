// User Data reducer file

// Server configs:
import { TOKEN_NAME } from "../../configs/_storage"
// Types:
import { user_state_type } from "../types/reducerStateTypes"
// Actions:
import { UserAction } from "../action-types/User"


const initState: user_state_type = {
  isLoading: false,
  isAuthed: false,
  UserData: null
}

export default (state = initState, action: UserAction): user_state_type => {
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
    case 'ADDING_WIZARD':
      if (state.UserData)
        // -- set isAddingWizard state to true
        state.UserData.isAddingWizard = true
      return { ...state }
    case 'ABORT_ADDING_WIZARD':
      if (state.UserData)
        // -- set isAddingWizard state to false
        state.UserData.isAddingWizard = false
      return { ...state }
    case 'DELETE_WIZARD':
      if (state.UserData?.wizards)
        state.UserData.wizards = state.UserData?.wizards.filter(
          wizard => wizard.id !== action.payload.wizard_id
        ) ?? []
      return { ...state }
    case 'ADD_WIZARD_SUCCESS':
      if (state.UserData?.wizards) {
        state.UserData.wizards.push(action.payload.new_wizard)
        state.UserData.isAddingWizard = false
      }
      return { ...state }
    default:
      return state
  }
}