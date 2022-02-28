// Actions for WizardForm

// Actions:
import { WizardServerFormPageFormat } from "../../interfaces/WizardFormat_Server"
import { WizardFormAction, WizardFormActionTypes } from "../action-types/WizardForm"
// Types:


// Move Page Action
export const MovePageAction = (dir: "BACK" | "NEXT"): WizardFormAction => ({
  type: WizardFormActionTypes.MOVE_PAGE,
  payload: dir
})


// Save Current Page
export const SaveAnswerPageAction = (answer_page: WizardServerFormPageFormat, answer_page_idx: number): WizardFormAction => ({
  type: WizardFormActionTypes.SAVE_ANSWER,
  payload: {answer_page, answer_page_idx}
})

