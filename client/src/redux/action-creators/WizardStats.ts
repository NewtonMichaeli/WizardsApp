// Action Creators for WizardStats functionallity

import axios from "axios"
import { Dispatch } from "redux"
// Types:
import { RootState } from ".."
import { _headers } from "../../configs/_headers"
import { SERVER_GET_WIZARD_URL } from "../../configs/_server"
import { MappedUserResultsType, ServerResultsType } from "../types"
// Actions:
import { UIAction } from "../action-types/UI"
import { UserRoleTypes } from "../action-types/User"
import { WizardStatsAction, WizardStatsActionTypes } from "../action-types/WizardStats"
import { ExtractDataToWizardStats } from "../../configs/_parser"
import { PushFeedback } from "../actions/UI"
import { WizardFormFormat } from "../../interfaces/WizardFormat_Form"
import { AuthAction, AuthActionTypes } from "../action-types/Auth"


// Map Results To State
export const MapResultsToState = (wizard_id: string) => async (dispatch: Dispatch<WizardStatsAction | UIAction | AuthAction>, getState: () => RootState): Promise<void> =>
{ 
  // Validate before entering stats
  const { UserData, isAuthed } = getState().user
  const { token } = getState().auth
  // Validate user before request:
  if (!token || !isAuthed || !UserData || (UserData.role !== UserRoleTypes.ADMIN && UserData.role !== UserRoleTypes.WIZARD_CREATOR)) {
    // -- unauthorized - only users can fill wizard forms
    dispatch({type: AuthActionTypes.AUTH_FAIL})
    return
  }

  // Map Results To State
  try {

    const server_res = await axios.get(
      SERVER_GET_WIZARD_URL(wizard_id),
      {headers: _headers(token)}
    )
    console.log(server_res.data);
    
    // Mapping results to state
    const wizard_content: WizardFormFormat = JSON.parse(server_res.data.content)
    const wizard_results: ServerResultsType[] = JSON.parse(server_res.data.results)
    // console.log("Content: ", wizard_content)
    // console.log("Results: ", wizard_results)
    
    // Parse results
    let mapped_wizard_results: MappedUserResultsType = ExtractDataToWizardStats(wizard_results)

    dispatch({
      type: WizardStatsActionTypes.MAP_RESULTS_TO_STATE,
      payload: {
        Wizard: wizard_content,
        AllAnswers: mapped_wizard_results ?? null
      }
    })
    // success msg
    dispatch(PushFeedback(true, "Statistics are Successfully Loaded!"))
  }
  catch (error: any) {
    // display error message
    console.log(error)
    dispatch(PushFeedback(false, 
      error?.response?.message ?? error?.response?.data ?? "Couldn't load Statistics"
    ))
    dispatch({ type: WizardStatsActionTypes.WIZARD_NOT_FOUND })
  }
}

