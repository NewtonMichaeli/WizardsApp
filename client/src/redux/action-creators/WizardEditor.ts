// Action Creators for WizardEditor functionallity

// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
import { WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"


// Move Page
export const MovePage = (dir: "BACK" | "NEXT"): WizardEditorAction => ({
  type: WizardEditorActionTypes.MOVE_PAGE,
  payload: dir
})


// Load User Action creator, called directly from <App> component
export const ExtractWizard = (id: string) => (dispatch: Dispatch<WizardEditorAction>, getState: () => RootState): void => {

  // Extract wizard from wizards list at <user>
  const { UserData, isLoading, isAuthed } = getState().user

  const CurrWizard = UserData?.wizards.filter(wizard => wizard.id === id)[0] ?? null
  
  if (isLoading === false && !CurrWizard && isAuthed) {
    // -- wizard not found - gen. auth_fail
    dispatch({type: WizardEditorActionTypes.AUTH_FAIL})
    return
  }
  console.log(CurrWizard);
  
  // Extract wizard on success - save to global state
  dispatch({
    type: WizardEditorActionTypes.EXTRACT_WIZARD,
    payload: CurrWizard
  })
}

