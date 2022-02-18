// User Data reducer file

import { WizardEditorAction } from "../action-types/WizardEditor"
import { wizard_editor_state_type } from "../types/reducerStateTypes"


const initState: wizard_editor_state_type = {
  IsAction: false,
  ActionTriggerType: null,
  ActionType: null,
  temp_payload: {},
  // current wizard state - questions, sections, etc.. :
  WizardState: null,
  Page: null,
  PageIdx: 0
}

export default (state = initState, action: WizardEditorAction) => {
  
  switch (action.type) {
    case 'EXTRACT_WIZARD': {
        const PageIdx = action.payload?.pages.length ? 0 : -1
        return {
          ...state,
          WizardState: action.payload,
          PageIdx,
          Page: PageIdx >= 0 && action.payload?.pages[PageIdx]    // default page
        }
      }
    case 'AUTH_FAIL': {
      window.location.href = '/dashboard'
      return {
        ...state
      }
    }
    case 'MOVE_PAGE': {
      // avoid page overflow
      if (
        action.payload === 'NEXT' &&
        state['PageIdx'] + 1 === state.WizardState?.pages.length ||
        action.payload === 'BACK' &&
        state['PageIdx'] === 0 ||
        !state.WizardState?.pages.length
      ) return { ... state}
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
    default:
      return state
  }
}