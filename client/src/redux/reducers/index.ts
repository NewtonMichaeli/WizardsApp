// Combine all reducers
import authReducer from "./Auth_Reducer";
import uiReducer from "./UI_Reducer";
import userReducer from "./User_Reducer";
import WizardEditor_reducer from './WizardEditor_Reducer'
import WizardForm_Reducer from "./WizardForm_Reducer";
import WizardStats_Reducer from "./WizardStats_Reducer";
import { combineReducers } from "redux";

// Export all reducers on index file
export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer,
  wizard_editor: WizardEditor_reducer,
  wizard_form: WizardForm_Reducer,
  wizard_stats: WizardStats_Reducer
})
