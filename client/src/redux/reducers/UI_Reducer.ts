// UI (feedback) reducer file

import { UI_ActionType } from "../types/actionTypes";
import { ui_state_type } from "../types/reducerStateTypes";


const initState: ui_state_type = {
  msg: null,
  status: false
}

export default (state = initState, action: UI_ActionType) => {
  switch (action.type) {
    case 'SET_FEEDBACK':
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      }
    case 'CLEAR_FEEDBACK':
      return {
        msg: "",
        status: null,
      }
    default:
      return state
  }
}