// Combine all reducers
import authReducer from "./Auth_Reducer";
import uiReducer from "./UI_Reducer";
import userReducer from "./User_Reducer";
import { combineReducers } from "redux";

// Export all reducers on index file
export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer
})
