// Action Creators for User Authorization

import axios from "axios"
// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
// Server configs:
import { SERVER_CREATE_WIZARD_URL, SERVER_DELETE_WIZARD } from "../../configs/_server"
import { fake_wizard, WizardFormat } from "../../interfaces/WizardFormat"
import { UIAction } from "../action-types/UI"
import { UserAction, UserActionTypes, UserRoleTypes } from "../action-types/User"
import { AbortAddingWizard } from "../actions/User"
import { PushFeedback } from "./UI"


// Load User Action creator, called directly from <App> component
export const LoadUser = (id: string | null = null) => async (dispatch: Dispatch<UserAction>, getState: () => RootState): Promise<void> => {
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
    
    // --- [ln 6-40] Uncomment/Comment if server responds
    const res = {
      data: {
        user: {
            name: "CloudKid",
            email: "kid@cloud.com",
            role: UserRoleTypes.ADMIN
        }
      }
    }

    // // if id is null - get all wizards
    // const server_res = await axios.get(
    //   id ? SERVER_USERDETAILS_URL : SERVER_SPECIFIC_WIZARD_URL + id,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "auth-token": token
    //     }
    // })
    
    const wizard_data = localStorage.getItem('data')
    // extract user details from response
    const user = res.data.user
    // fake init dispatch - testing
    dispatch({
      type: UserActionTypes.LOAD_USER_SUCCESS,
      payload: {
        UserData: {
          username: user['name'],
          email: user['email'],
          role: user['role'],
          isAddingWizard: false,
          // wizards: fake_wizard   // load fake wizards for now
          wizards: wizard_data
            ? [JSON.parse(wizard_data)]
            : fake_wizard
          // load fake wizards for now
        }
      }
    })
  }
  catch (err: any) {
    console.log(err)
    dispatch({ type: UserActionTypes.AUTH_FAIL })   // -- stop loading and declare failure
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
    
    const wizard_data: WizardFormat = {
      name: "New Wizard",
      id: "ckjwoecwer",
      pages: []
    }
    // add wizard from response
    dispatch({
      type: UserActionTypes.ADD_WIZARD_SUCCESS,
      payload: {
        new_wizard: server_res?.data ?? wizard_data
      }
    })
    // good feedback
    dispatch(PushFeedback(true, "Wizard Created Successfully"))
  }
  catch (err: any) {
    // abort adding wizard
    dispatch(AbortAddingWizard())
    // error feedback
    dispatch(PushFeedback(false, 
      err.response?.message ??
      err.response?.data ??
      "Failed creating Wizard"
    ))
  }
}
