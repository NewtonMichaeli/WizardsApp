// User Data reducer file

// Types:
import { wizard_stats_state_type } from "../types/reducerStateTypes"
// Reducer helpers:
import { WizardStatsAction } from "../action-types/WizardStats"


const initState: wizard_stats_state_type = {
  // current wizard state - questions, sections, etc.. :
  Wizard: null,
  AllAnswers: null,
  StatsMode: "STATS",
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
        isLoading: false,
        Username: Object.keys(action.payload.AllAnswers ?? {'':''})[0]
      }
    }
    case 'WIZARD_NOT_FOUND': {
      window.location.href = '/dashboard'
      return state
    }
    // Switch Tab (stats/results)
    case 'SWITCH_TAB': {
      // Change different values only
      if (state.StatsMode === action.payload.to) 
        return state
      else return {
        ...state,
        StatsMode: action.payload.to
      }
    }
    // Inspect Username
    case 'INSPECT_USERNAME': {
      return {
        ...state,
        Username: action.payload.username
      }
    }
    // Default
    default:
      return state
  }
}