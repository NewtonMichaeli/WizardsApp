// Action Creators for User Authorization

import axios from "axios"
// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
// Server configs:
import { SERVER_SPECIFIC_WIZARD_URL, SERVER_USERDETAILS_URL } from "../../configs/_server"
import { fake_wizard } from "../../interfaces/WizardFormat"
import { UserAction, UserActionTypes, UserRoleTypes } from "../action-types/User"


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

