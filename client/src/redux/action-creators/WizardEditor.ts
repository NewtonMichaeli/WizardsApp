// Action Creators for WizardEditor functionallity

import axios from "axios"
// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
import { UserRoleTypes } from "../action-types/User"
// Actions:
import { WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"
import { PushFeedback } from "../actions/UI"
import { UIAction } from "../action-types/UI"
import { SERVER_UPDATE_WIZARD } from "../../configs/_server"
import { _headers } from "../../configs/_headers"
import { AuthAction, AuthActionTypes } from "../action-types/Auth"


// Load User Action creator, called directly from <App> component
export const ExtractWizard = (id: string) => (dispatch: Dispatch<WizardEditorAction | AuthAction>, getState: () => RootState): void => {
  
  // States
  const { UserData, isLoading, isAuthed } = getState().user

  // Auth check
  // if (UserData?.role !== UserRoleTypes.WIZARD_CREATOR) {
  if (UserData?.role === UserRoleTypes.USER) {
    // no token
    dispatch({type: AuthActionTypes.AUTH_FAIL})
    return
  }

  // Extract wizard from wizards list at <user>
  const CurrWizard = UserData?.wizards?.filter(wizard => wizard.id.toString() === id)[0] ?? null
  console.log(CurrWizard)
  
  if (isLoading === false && !CurrWizard && isAuthed) {
    // -- wizard not found - gen. auth_fail
    dispatch({type: WizardEditorActionTypes.WIZARD_NOT_FOUND})
    return
  }
  
  // Extract wizard on success - save to global state
  dispatch({
    type: WizardEditorActionTypes.EXTRACT_WIZARD,
    payload: CurrWizard
  })
}


// Save Changes
export const SaveChanges = (wizard_id: string) => async (
  dispatch: Dispatch<WizardEditorAction | UIAction | AuthAction>, getState: () => RootState
): Promise<void> => {

  // Send Changes to server

  // States:
  const { WizardState } = getState().wizard_editor
  const { UserData } = getState().user
  const { token } = getState().auth

  // Validate user before request:
  if (!token || !UserData || UserData.role === UserRoleTypes.USER) {
    // -- unauthorized - only users can fill wizard forms
    dispatch({type: AuthActionTypes.AUTH_FAIL})
    return
  }  

  if (WizardState === null) {
    dispatch(PushFeedback(false, "Cant Move while page doesn't exist"))
    return
  }

  try {
    const new_wizard = getState().wizard_editor.WizardState

    console.log(new_wizard);
    
    // save data in localstorage temporarly
    // localStorage.setItem('data', JSON.stringify(new_wizard))
    const res = await axios.patch(
      SERVER_UPDATE_WIZARD + WizardState.id,
      // new wizard details
        {
          newWizard: WizardState,
          wizardId: WizardState.id
        },
        {
          headers: _headers(token)
        }
    )

    // Success feedback
    dispatch(PushFeedback(true, "Data has been Saved Successfully"))
  }
  catch (err: any) {
    // Set error feedback
    dispatch(PushFeedback(false, err?.response?.message ?? err?.response?.data ?? "An error has occured"))
  }
}
