// Action Creators for User Authorization

import axios from "axios"
// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
// Server configs:
import { SERVER_CREATE_WIZARD_URL, SERVER_DELETE_WIZARD, SERVER_GET_WIZARDS_URL, SERVER_USERDETAILS_URL } from "../../configs/_server"
import { fake_wizard, WizardFormat, WizardPageFormat } from "../../interfaces/WizardFormat"
import { UIAction } from "../action-types/UI"
import { UserAction, UserActionTypes, UserRoleTypes } from "../action-types/User"
import { AbortAddingWizard } from "../actions/User"
import { PushFeedback } from "../actions/UI"


// Load User Action creator, called directly from <App> component
export const LoadUser = () => async (dispatch: Dispatch<UserAction>, getState: () => RootState): Promise<void> => {
  // Try receiving user data
  const token = getState().auth.token
  dispatch({ type: UserActionTypes.TRY_LOAD_USER })   // set loading to true
  try 
  {
    if (token === null) {
      // -- auth failed - token doesn't exist
      dispatch({ type: UserActionTypes.AUTH_FAIL })
      return
    }

    const server_res = await axios.get(SERVER_USERDETAILS_URL, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
    })
    
    // extract user details from response
    const {name, email, role} = server_res.data.user
    console.log("%s%s%s", name, email, role);
    
    dispatch({
      type: UserActionTypes.LOAD_USER_SUCCESS,
      payload: {
        UserData: {
          username: name,
          email,
          role,
          isAddingWizard: false,
          wizards: []
        }
      }
    })
  }
  catch (err: any) {
    console.log(err)
    dispatch({ type: UserActionTypes.AUTH_FAIL })   // -- stop loading and declare failure
  }
}


const ExtractDataToWizards = (server_wizard: any): WizardFormat => {
  const wizard_content = JSON.parse(server_wizard.content)
  return {
    name: (wizard_content.name as string),
    id: (server_wizard.id as string),
    pages: (wizard_content?.pages as WizardPageFormat[]) ?? []  
  }
}


// Get Wizards (optional id = specific wizard)
export const GetWizards = () => async (dispatch: Dispatch<UserAction>, getState: () => RootState): Promise<void> => {

  // Try receiving user wizards
  const token = getState().auth.token ?? ""
  try {

    // Get wizards
    const server_res = await axios.get(
      SERVER_GET_WIZARDS_URL, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      }
    })
    
    const data: any[] = server_res.data.results
    console.log(data)
    // Extract server_res data to valid format
    let wizards: WizardFormat[] = [...data.map(wizard => ExtractDataToWizards(wizard))]
    console.log(wizards)
    // Load wizards success
    dispatch<UserAction>({ 
      type: UserActionTypes.LOAD_WIZARDS_SUCCESS,
      payload: {
        UserData: {
          wizards
        }
      }
    })
  }
  catch (err: any) {
    console.log(err)
    // dispatch({ type: UserActionTypes.AUTH_FAIL })   // -- stop loading and declare failure
  }
  
}


// Delete Wizard
export const DeleteWizard = (wizard_id: string) => async (dispatch: Dispatch<UserAction | UIAction>, getState: () => RootState): Promise<void> => {
  // Delete Wizard
  const { token, isAuthed } = getState().auth
  try 
  {
    // if (token === null || !isAuthed) {
    //   // -- auth failed - token doesn't exist
    //   dispatch({ type: UserActionTypes.AUTH_FAIL })
    //   return
    // }

    // const server_res = await axios.delete(SERVER_DELETE_WIZARD + wizard_id, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": token ?? false
    //   }
    // })
    
    // delete wizard action dispatch
    dispatch({
      type: UserActionTypes.DELETE_WIZARD,
      payload: { wizard_id }
    })

    // push success feedback
    dispatch(PushFeedback(true, "Wizard deleted successfully"))
  }
  catch (err: any) {
    dispatch(PushFeedback(false, 
      err.response?.message ??
      err.response?.data ??
      "Failed deleting Wizard"
    ))
  }
}


// Add Wizard
export const AddWizard = (wizard_name: string) => async (dispatch: Dispatch<UserAction | UIAction>, getState: () => RootState): Promise<void> => {
  // Add Wizard
  const token = getState().auth.token
  try 
  {
    if (token === null) {
      // -- auth failed - token doesn't exist
      dispatch({ type: UserActionTypes.AUTH_FAIL })
      return
    }
    
    // if id is null - get all wizards
    const server_res = await axios.post(
      SERVER_CREATE_WIZARD_URL,
      {
        name: wizard_name
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      }
    )

    // add wizard from response
    const returned_wizard = ExtractDataToWizards(server_res.data.results)
    const {id, name, pages} = returned_wizard
    // Dispatch success
    dispatch({
      type: UserActionTypes.ADD_WIZARD_SUCCESS,
      payload: {
        new_wizard: {
          id, name, pages
        }
      }
    })
    // good feedback
    dispatch(PushFeedback(true, "Wizard Created Successfully"))
  }
  catch (err: any) {
    // abort adding wizard
    console.log(err)
    dispatch(AbortAddingWizard())
    // error feedback
    dispatch(PushFeedback(false, 
      err.response?.message ??
      err.response?.data ??
      "Failed creating Wizard"
    ))
  }
}
