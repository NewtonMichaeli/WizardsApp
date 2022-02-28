// Actions for WizardStats

// Types:
import { ValidServerFormInputType, WizardServerFormFormat } from "../../interfaces/WizardFormat_Server"


// Action Types
export enum WizardStatsActionTypes {
  MAP_RESULTS_TO_STATE = "MAP_RESULTS_TO_STATE",
  STATS_AUTH_FAIL = "STATS_AUTH_FAIL",
  WIZARD_NOT_FOUND = "WIZARD_NOT_FOUND",
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

// Wizard not fuond
interface WizardNotFoundAction {
  type: WizardStatsActionTypes.WIZARD_NOT_FOUND
}


// Action types for WizardForm Action
export type WizardStatsAction = MapResultsToStateAction
  | StatsAuthFailAction 
  | WizardNotFoundAction
