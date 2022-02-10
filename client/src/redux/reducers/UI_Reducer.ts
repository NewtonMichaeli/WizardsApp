// UI (feedback) reducer file

import { UIAction } from "../action-types/UI";
import { ui_state_type } from "../types/reducerStateTypes";


const initState: ui_state_type = {
  msg: null,
  status: false
}

export default (state = initState, action: UIAction) => {
  switch (action.type) {
    case 'SET_FEEDBACK':
      return {
        msg: action.payload.msg,
        status: action.payload.status,
      }
    case 'CLEAR_FEEDBACK':
      return {
        msg: null,
        status: false,
      }
    default:
      return state
  }
}