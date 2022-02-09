// UI (feedback) Actions file
import { UI_ActionType } from "../types/actionTypes";


/** Action Creators props */

// Set Feedback Action - props
type setFeedback__props = {
  (status: UI_ActionType['payload']['status'], msg: UI_ActionType['payload']['msg']): UI_ActionType
}
// Clear Feedback Action - props
type clearFeedback__props = {
  (): UI_ActionType
}


/** Action Creators */

// Set Feedback Action
export const setFeedback: setFeedback__props = (status, msg = "Success") => ({type: 'SET_FEEDBACK', payload: {msg, status}})
// Clear Feedback Action
export const clearFeedback: clearFeedback__props = () => ({type: 'SET_FEEDBACK', payload: {msg: null, status: false}})
