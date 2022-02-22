// Action types for Authorization

// Action types
export enum UIActionTypes {
  PUSH_FEEDBACK = "PUSH_FEEDBACK",
  CLEAR_FEEDBACK = "CLEAR_FEEDBACK"
}

interface PushFeedbackAction {
  type: UIActionTypes.PUSH_FEEDBACK
  payload: {
    status: boolean,
    msg: string
  }
}

interface ClearFeedbackAction {
  type: UIActionTypes.CLEAR_FEEDBACK
}


// Action types for UI Action
export type UIAction = 
  PushFeedbackAction | ClearFeedbackAction
