// User Data reducer file

// Types:
import { wizard_form_state_type } from "../types/reducerStateTypes"
import { WizardEditorActionTypes } from "../action-types/WizardEditor"
// Reducer helpers:
import { AddElementToState, RemoveElementFromState, ModifyElementInState, ClearStateSideStats } from "../reducer_helpers/WizardEditor"
import { WizardFormAction } from "../action-types/WizardForm"


const initState: wizard_form_state_type = {
  // current wizard state - questions, sections, etc.. :
  Wizard: null,
  Answer: null,
  Page: null,
  PageIdx: 0
}


export default (state = initState, action: WizardFormAction): wizard_form_state_type => {
  
  switch (action.type) {
    // Extract wizard from user wizards
    case 'EXTRACT_WIZARD_FORM': {
      const PageIdx = 0
      const wizard = action.payload.wizard
      return {
        ...state,
        Wizard: action.payload.wizard,
        Answer: wizard ? {
          name: wizard.name,
          id: wizard.id,
          pages: []       // dynamically modified
        } : null,
        PageIdx,
        Page: action.payload.wizard?.pages[PageIdx] ?? null    // default page
      }
    }
    // Form Auth failure
    case 'FORM_AUTH_FAIL': {
      window.location.href = '/'
      return state
    }
    // Auth failure
    case 'WIZARD_NOT_FOUND': {
      window.location.href = '/'
      return state
    }
    // Move page next/back
    case 'MOVE_PAGE': {
      // avoid page overflow
      if (
        (action.payload === 'NEXT' && state['PageIdx'] + 1 === state.Wizard?.pages.length) ||
        (action.payload === 'BACK' && state['PageIdx'] === 0) ||
        !state.Wizard?.pages.length
      ) return state
      // -- DONT MOVE PAGE IF PAGE NOT COMPLETE --

      // update page index
      const UpdatedPageIdx = state.PageIdx + (action.payload === 'NEXT' ? 1 : -1)
        
      return {
        ...state,
        PageIdx: UpdatedPageIdx,
        Page: state.Wizard?.pages[UpdatedPageIdx] ?? null
      }
    }
    // Send Form Answer Success
    case 'SEND_ANSWER_SUCCESS': {
      return state
    }
    // Default
    default:
      return state
  }
}