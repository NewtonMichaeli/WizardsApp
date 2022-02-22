// UI (feedback) reducer file

import { UIAction } from "../action-types/UI";
import { ui_state_type } from "../types/reducerStateTypes";


const initState: ui_state_type = {
  notifications: [],
  ui_counter: 0
}

export default (state = initState, action: UIAction) => {
  switch (action.type) {
    case 'PUSH_FEEDBACK': {
      // push notification
      const curr_ui_id = state.ui_counter + 1
      const new_state = {
        ...state,
        notifications: [
          ...state.notifications,
          {...action.payload, id: curr_ui_id}
        ],
        ui_counter: curr_ui_id
      }
      return new_state
    }
    case 'CLEAR_FEEDBACK': {
      // pop last notification
      state.notifications?.shift()
      return {...state}
    }
    default:
      return state
  }
}