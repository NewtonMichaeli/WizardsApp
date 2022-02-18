// Action types for User

import { WizardFormat } from "../../interfaces/WizardFormat";

// Action types
export enum WizardEditorActionTypes {
  EXTRACT_WIZARD = "EXTRACT_WIZARD",
  AUTH_FAIL = "AUTH_FAIL",
  MOVE_PAGE = "MOVE_PAGE",
  MODIFY_WIZARD = "MODIFY_WIZARD"
}

// Extract wizard from user wizards
interface ExtractWizardAction {
  type: WizardEditorActionTypes.EXTRACT_WIZARD,
  payload: WizardFormat | null
}

// Extract wizard from user wizards
interface AuthFailAction {
  type: WizardEditorActionTypes.AUTH_FAIL
}

// Move page (forwards/backwards via payload instruction)
interface MovePageAction {
  type: WizardEditorActionTypes.MOVE_PAGE,
  payload: "NEXT" | "BACK"
}


// Action types for UI Action
export type WizardEditorAction = 
  ExtractWizardAction | AuthFailAction | MovePageAction
  