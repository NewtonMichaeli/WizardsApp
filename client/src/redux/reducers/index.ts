// Combine all reducers
import authReducer from "./Auth_Reducer";
import errorReducer from "./UI_Reducer";
import { combineReducers } from "redux";

// export all reducers on index file
export default combineReducers({
  auth: authReducer,
  ui: errorReducer
})