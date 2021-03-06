// Actions for User

// Types:
import { UserAction, UserActionTypes } from "../action-types/User"


// Adding wizard
export const AddingWizard = (): UserAction => ({
  type: UserActionTypes.ADDING_WIZARD
})

// Abort Adding wizard
export const AbortAddingWizard = (): UserAction => ({
  type: UserActionTypes.ABORT_ADDING_WIZARD
})

// Set Page Title
export const SetPageTitle = (title: string): UserAction => ({
  type: UserActionTypes.SET_PAGE_TITLE,
  payload: { title }
})
