// Actions for WizardStats

// Types:
import { ValidServerFormInputType, WizardServerFormFormat } from "../../interfaces/WizardFormat_Server"
import { wizard_stats_state_type } from "../types/reducerStateTypes"


// Action Types
export enum WizardStatsActionTypes {
  MAP_RESULTS_TO_STATE = "MAP_RESULTS_TO_STATE",
  STATS_AUTH_FAIL = "STATS_AUTH_FAIL",
  WIZARD_NOT_FOUND = "WIZARD_NOT_FOUND",
  SWITCH_TAB = "SWITCH_TAB",
}

// Extract wizard from user wizards
interface MapResultsToStateAction {
  type: WizardStatsActionTypes.MAP_RESULTS_TO_STATE
  payload: {
    Wizard: WizardServerFormFormat | null
    AllAnswers: {
      [username: string]: {
        [q_name: string]: ValidServerFormInputType
      }
    } | null
  }
}

// Extract wizard from user wizards
interface StatsAuthFailAction {
  type: WizardStatsActionTypes.STATS_AUTH_FAIL
}

// Wizard not found
interface WizardNotFoundAction {
  type: WizardStatsActionTypes.WIZARD_NOT_FOUND
}

// Wizard not found
interface SwitchTabAction {
  type: WizardStatsActionTypes.SWITCH_TAB,
  payload: {
    to: wizard_stats_state_type['StatsMode']
  }
}


// Action types for WizardForm Action
export type WizardStatsAction = MapResultsToStateAction
  | StatsAuthFailAction 
  | WizardNotFoundAction
  | SwitchTabAction
