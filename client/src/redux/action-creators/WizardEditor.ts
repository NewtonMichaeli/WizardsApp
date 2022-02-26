// Action Creators for WizardEditor functionallity

import axios from "axios"
// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
// Actions:
import { WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"
import { PushFeedback } from "../actions/UI"
import { UIAction } from "../action-types/UI"
import { SERVER_GET_WIZARDS_URL } from "../../configs/_server"
import { UserAction, UserActionTypes } from "../action-types/User"


// Load User Action creator, called directly from <App> component
export const ExtractWizard = (id: string) => (dispatch: Dispatch<WizardEditorAction>, getState: () => RootState): void => {
  
  // Extract wizard from wizards list at <user>
  const { UserData, isLoading, isAuthed } = getState().user
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
  dispatch: Dispatch<WizardEditorAction | UIAction>, getState: () => RootState
): Promise<void> => {

  // Send Changes to server


  try {
    const new_wizard = getState().wizard_editor.WizardState

    console.log(new_wizard);
    
    // save data in localstorage temporarly
    localStorage.setItem('data', JSON.stringify(new_wizard))

    // const res = await axios.post(SERVER_UPDATE_WIZARD + wizard_id, {
    //   // new wizard details
    //   // ...new_wizard
    // })

    // Success feedback
    dispatch(PushFeedback(true, "Data has been Saved Successfully"))
  }
  catch (err: any) {
    // Set error feedback
    dispatch(PushFeedback(false, err?.response?.message ?? err?.response?.data ?? "An error has occured"))
  }

  // Extract wizard on success - save to global state
  // dispatch({
  //   type: WizardEditorActionTypes.EXTRACT_WIZARD,
  //   payload: CurrWizard
  // })
}

