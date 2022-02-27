// Actions for WizardForm

// Types:
import { WizardFormFormat } from "../../interfaces/WizardFormat_Form"


// Action Types
export enum WizardFormActionTypes {
  EXTRACT_WIZARD_FORM = "EXTRACT_WIZARD_FORM",
  FORM_AUTH_FAIL = "FORM_AUTH_FAIL",
  MOVE_PAGE = "MOVE_PAGE",
  WIZARD_NOT_FOUND = "WIZARD_NOT_FOUND",
  SEND_ANSWER_SUCCESS = "SEND_ANSWER_SUCCESS",
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
