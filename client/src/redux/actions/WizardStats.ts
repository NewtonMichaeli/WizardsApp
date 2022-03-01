// Actions for WizardStats

// Actions:
import { WizardStatsAction, WizardStatsActionTypes } from "../action-types/WizardStats"
import { wizard_stats_state_type } from "../types/reducerStateTypes"


// Switch Tab Action
export const SwitchTab = (to: wizard_stats_state_type['StatsMode']): WizardStatsAction => ({
  type: WizardStatsActionTypes.SWITCH_TAB,
  payload: { to }
})


// Switch Tab Action
export const InspectUsername = (username: wizard_stats_state_type['Username']): WizardStatsAction => ({
  type: WizardStatsActionTypes.INSPECT_USERNAME,
  payload: { username }
})

