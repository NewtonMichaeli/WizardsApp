// Actions for WizardForm

// Actions:
import { WizardFormAction, WizardFormActionTypes } from "../action-types/WizardForm"
// Types:


// Move Page Action
export const MovePageAction = (dir: "BACK" | "NEXT"): WizardFormAction => ({
  type: WizardFormActionTypes.MOVE_PAGE,
  payload: dir
})


