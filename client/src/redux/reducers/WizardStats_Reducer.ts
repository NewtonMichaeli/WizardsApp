// User Data reducer file

// Types:
import { wizard_stats_state_type } from "../types/reducerStateTypes"
// Reducer helpers:
import { WizardStatsAction } from "../action-types/WizardStats"


const initState: wizard_stats_state_type = {
  // current wizard state - questions, sections, etc.. :
  Wizard: null,
  AllAnswers: null,
  isLoading: true     // -- loading is default
}


export default (state = initState, action: WizardStatsAction): wizard_stats_state_type => {
  
  switch (action.type) {
    // Extract wizard from user wizards
    case 'MAP_RESULTS_TO_STATE': {
      console.log(action.payload.AllAnswers)
      return {
        ...state,
        Wizard: action.payload.Wizard,
        AllAnswers: action.payload.AllAnswers ?? null,
        isLoading: false
      }
    }
    // Form Auth failure
    case 'STATS_AUTH_FAIL': {
      window.location.href = '/login'
      return state
    }
    // Auth failure
    case 'WIZARD_NOT_FOUND': {
      window.location.href = '/dashboard'
      return state
    }
    // Default
    default:
      return state
  }
}