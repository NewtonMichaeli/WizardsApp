// Actions for WizardForm

// Types:
import { WizardFormFormat } from "../../interfaces/WizardFormat_Form"
import { WizardServerFormFormat, WizardServerFormPageFormat } from "../../interfaces/WizardFormat_Server"


// Action Types
export enum WizardFormActionTypes {
  EXTRACT_WIZARD_FORM = "EXTRACT_WIZARD_FORM",
  FORM_AUTH_FAIL = "FORM_AUTH_FAIL",
  MOVE_PAGE = "MOVE_PAGE",
  WIZARD_NOT_FOUND = "WIZARD_NOT_FOUND",
  // wizard
  SEND_ANSWER_SUCCESS = "SEND_ANSWER_SUCCESS",
  SAVE_ANSWER = "SAVE_ANSWER",
}

// Extract wizard from user wizards
interface ExtractWizardAction {
  type: WizardFormActionTypes.EXTRACT_WIZARD_FORM,
  payload: {
    wizard: WizardFormFormat | null
  }
}

// Extract wizard from user wizards
interface FormAuthFailAction {
  type: WizardFormActionTypes.FORM_AUTH_FAIL
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
    answer_page: WizardServerFormPageFormat
    answer_page_idx: number
  }
}

// Send Answer
interface SendAnswerAction {
  type: WizardFormActionTypes.SEND_ANSWER_SUCCESS
}


// Action types for WizardForm Action
export type WizardFormAction = ExtractWizardAction
  | FormAuthFailAction 
  | MovePageAction 
  | WizardNotFoundAction
  | SendAnswerAction
  | SaveAnswerAction
