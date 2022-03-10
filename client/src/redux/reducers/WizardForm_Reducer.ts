// User Data reducer file

// Types:
import { wizard_form_state_type } from "../types/reducerStateTypes"
// Reducer helpers:
import { WizardFormAction } from "../action-types/WizardForm"


const initState: wizard_form_state_type = {
  // current wizard state - questions, sections, etc.. :
  Wizard: null,
  Answer: {},
  Page: null,
  PageIdx: 0
}


export default (state = initState, action: WizardFormAction): wizard_form_state_type => {
  
  switch (action.type) {
    // Extract wizard from user wizards
    case 'EXTRACT_WIZARD_FORM': {
      const PageIdx = 0
      return {
        ...state,
        Wizard: action.payload.wizard,
        Answer: {},
        PageIdx,
        Page: action.payload.wizard?.pages[PageIdx] ?? null    // default page
      }
    }
    case 'WIZARD_NOT_FOUND': {
      window.location.href = '/dashboard'
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
      // update page index
      const UpdatedPageIdx = state.PageIdx + (action.payload === 'NEXT' ? 1 : -1)
      return {
        ...state,
        PageIdx: UpdatedPageIdx,
        Page: state.Wizard?.pages[UpdatedPageIdx] ?? null
      }
    }
    // Send Form Answer Success
    case 'SAVE_ANSWER': {
      if (state.Answer)
        // -- update state 
        // state.Answer.pages.splice(action.payload.answer_page_idx, 0, action.payload.answer_page)
        state.Answer = {
          ...state.Answer,
          ...action.payload.answer_page
        }
      return {...state}
    }
    case 'SEND_ANSWER_SUCCESS': {
      window.alert("Answer Submitted!")
      // window.location.href = '/'
      return state
    }
    // Default
    default:
      return state
  }
}