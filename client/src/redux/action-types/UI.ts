// Action types for Authorization

// Action types
export enum UIActionTypes {
  SET_FEEDBACK = "SET_FEEDBACK",
  CLEAR_FEEDBACK = "CLEAR_FEEDBACK"
}

interface SetFeedbackAction {
  type: UIActionTypes.SET_FEEDBACK
  payload: {
    status: boolean,
    msg: string | null
  }
}

interface ClearFeedbackAction {
  type: UIActionTypes.CLEAR_FEEDBACK
}


// Action types for UI Action
export type UIAction = 
  SetFeedbackAction | ClearFeedbackAction
