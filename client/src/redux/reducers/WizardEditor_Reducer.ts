// User Data reducer file

import { AddElement } from "../action-creators/WizardEditor"
import { WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"
import { wizard_editor_state_type } from "../types/reducerStateTypes"


const initState: wizard_editor_state_type = {
  IsAction: false,
  ActionTriggerType: null,
  ActionType: null,
  // current wizard state - questions, sections, etc.. :
  WizardState: null,
  Page: null,
  PageIdx: 0
}


export default (state = initState, action: WizardEditorAction): wizard_editor_state_type => {
  
  switch (action.type) {
    // Extract wizard from user wizards
    case 'EXTRACT_WIZARD': {
        const PageIdx = action.payload?.pages.length ? 0 : -1
        return {
          ...state,
          WizardState: action.payload,
          PageIdx,
          Page: action.payload?.pages[PageIdx] ?? null    // default page
        }
      }
    // Auth failure
    case 'AUTH_FAIL': {
      window.location.href = '/dashboard'
      return state
    }
    // Move page next/back
    case 'MOVE_PAGE': {
      // avoid page overflow
      if (
        action.payload === 'NEXT' &&
        state['PageIdx'] + 1 === state.WizardState?.pages.length ||
        action.payload === 'BACK' &&
        state['PageIdx'] === 0 ||
        !state.WizardState?.pages.length
      ) return state
      // update page index
      const UpdatedPageIdx = action.payload === 'NEXT'
        ? state['PageIdx'] + 1 
        : state['PageIdx'] - 1
        
      return {
        ...state,
        PageIdx: UpdatedPageIdx,
        Page: state.WizardState?.pages[UpdatedPageIdx] ?? null
      }
    }
    // AddElement
    case 'ADDING_ELEMENT': {
      return {
        ...state,
        IsAction: true,
        ActionTriggerType: action.payload,
        ActionType: WizardEditorActionTypes.ADDING_ELEMENT
      }
    }
    case 'ADD_ELEMENT': {
      return AddElement(state, action)
    }
    case 'ABORT_ELEMENT_MODE': {
      return {
        ...state,
        IsAction: false,
        ActionTriggerType: null,
        ActionType: null
      }
    }
    // Default
    default:
      return state
  }
}