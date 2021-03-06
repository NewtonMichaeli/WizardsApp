// Actions for WizardForm

// Actions:
import { WizardFormAction, WizardFormActionTypes } from "../action-types/WizardForm"
import { ResultQuestions } from "../types"
// Types:


// Move Page Action
export const MovePageAction = (dir: "BACK" | "NEXT"): WizardFormAction => ({
  type: WizardFormActionTypes.MOVE_PAGE,
  payload: dir
})


// Save Current Page
export const SaveAnswerPageAction = (answer_page: ResultQuestions): WizardFormAction => ({
  type: WizardFormActionTypes.SAVE_ANSWER,
  payload: {answer_page}
})


// Save\Remove Page With Errors
export const SavePageWithErrors = (idx: number, method: 'REMOVE' | 'ADD'): WizardFormAction => ({
  type: WizardFormActionTypes.SAVE_PAGE_ERROR_IDX,
  payload: { method, idx }
})
