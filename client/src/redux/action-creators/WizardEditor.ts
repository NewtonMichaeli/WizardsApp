// Action Creators for WizardEditor functionallity

// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
import { ValidInputType } from "../../interfaces/WizardFormat"
import { AddElementAction, ElementTypes, WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"
import { wizard_editor_state_type } from "../types/reducerStateTypes"


// Move Page Action
export const MovePage = (dir: "BACK" | "NEXT"): WizardEditorAction => ({
  type: WizardEditorActionTypes.MOVE_PAGE,
  payload: dir
})


// Activate Adding Element State
export const AddingElementMode = (element: ElementTypes): WizardEditorAction => ({
  type: WizardEditorActionTypes.ADDING_ELEMENT,
  payload: element
})
// Activate Relocating Element State
export const RelocatingElementMode = (element: ElementTypes): WizardEditorAction => ({
  type: WizardEditorActionTypes.RELOCATING_ELEMENT,
  payload: element
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


// Add Element
export const AddElement = (
  state: wizard_editor_state_type, 
  action: AddElementAction
) => {

  // Add en element based on it's element-type
  switch (action.payload.element) {
    case ElementTypes.QUESTION: {
      // Add Question inside given path
      const new_element: ValidInputType = {
        type: 'Label',
        name: "new",
        title: 'aaa'
      }
      const {page, section, question} = action.payload.path
      // insert new element to the given path inside wizard tree
      state.WizardState?.pages[page][section].elements
        .splice(question, 0, new_element)
      
      return {
        ...state,
        IsAction: false,
        ActionTriggerType: null,
        ActionType: null
      }
    }
    default: 
      return state
  }

}