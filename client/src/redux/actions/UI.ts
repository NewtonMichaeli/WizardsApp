// Action Creators for UI Feedback

// Types:
import { UIAction, UIActionTypes } from "../action-types/UI"


// Sets feedback to given msg
export const PushFeedback = (status: boolean, msg: string): UIAction => ({
  type: UIActionTypes.PUSH_FEEDBACK,
  payload: { status, msg }
})

// Clears feedback
export const ClearFeedback = (): UIAction => ({type: UIActionTypes.CLEAR_FEEDBACK})
