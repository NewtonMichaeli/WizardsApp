// Actions for WizardForm

// Types:
import { WizardFormFormat } from "../../interfaces/WizardFormat_Form"
import { ResultQuestions } from "../types"


// Action Types
export enum WizardFormActionTypes {
  EXTRACT_WIZARD_FORM = "EXTRACT_WIZARD_FORM",
  MOVE_PAGE = "MOVE_PAGE",
  WIZARD_NOT_FOUND = "WIZARD_NOT_FOUND",
  // wizard
  SEND_ANSWER_SUCCESS = "SEND_ANSWER_SUCCESS",
  SAVE_ANSWER = "SAVE_ANSWER",
  SAVE_PAGE_ERROR_IDX = "SAVE_PAGE_ERROR_IDX",
}

// Extract wizard from user wizards
interface ExtractWizardAction {
  type: WizardFormActionTypes.EXTRACT_WIZARD_FORM,
  payload: {
    wizard: WizardFormFormat | null
  }
}

// Move page (forwards/backwards via payload instruction)
interface MovePageAction {
  type: WizardFormActionTypes.MOVE_PAGE,
  payload: "NEXT" | "BACK"
}

// Wizard not fuond
interface WizardNotFoundAction {
  type: WizardFormActionTypes.WIZARD_NOT_FOUND
}

// Save Answer
interface SaveAnswerAction {
  type: WizardFormActionTypes.SAVE_ANSWER,
  payload: {
    answer_page: ResultQuestions
  }
}

// Send Answer
interface SendAnswerAction {
  type: WizardFormActionTypes.SEND_ANSWER_SUCCESS
}

// Save page idx with error
interface SavePageErrorIdxAction {
  type: WizardFormActionTypes.SAVE_PAGE_ERROR_IDX,
  payload: {
    method: 'REMOVE' | 'ADD'
    idx: number
  }
}


// Action types for WizardForm Action
export type WizardFormAction = ExtractWizardAction
  | MovePageAction 
  | WizardNotFoundAction
  | SendAnswerAction
  | SaveAnswerAction
  | SavePageErrorIdxAction
