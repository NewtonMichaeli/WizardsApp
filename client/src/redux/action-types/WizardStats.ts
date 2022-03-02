// Actions for WizardStats

// Types:
import { WizardFormat } from "../../interfaces/WizardFormat"
import { ValidServerFormInputType } from "../../interfaces/WizardFormat_Server"
import { wizard_stats_state_type } from "../types/reducerStateTypes"


// Action Types
export enum WizardStatsActionTypes {
  MAP_RESULTS_TO_STATE = "MAP_RESULTS_TO_STATE",
  STATS_AUTH_FAIL = "STATS_AUTH_FAIL",
  WIZARD_NOT_FOUND = "WIZARD_NOT_FOUND",
  SWITCH_TAB = "SWITCH_TAB",
  INSPECT_USERNAME = "INSPECT_USERNAME",
}

// Extract wizard from user wizards
interface MapResultsToStateAction {
  type: WizardStatsActionTypes.MAP_RESULTS_TO_STATE
  payload: {
    Wizard: WizardFormat | null
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

// Set username to inspect Action
interface InspectUsernameAction {
  type: WizardStatsActionTypes.INSPECT_USERNAME,
  payload: {
    username?: string
  }
}


// Action types for WizardForm Action
export type WizardStatsAction = MapResultsToStateAction
  | StatsAuthFailAction 
  | WizardNotFoundAction
  | SwitchTabAction
  | InspectUsernameAction
