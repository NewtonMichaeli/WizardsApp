// Action Creators for WizardStats functionallity

import axios from "axios"
import { Dispatch } from "redux"
// Types:
import { RootState } from ".."
import { _headers } from "../../configs/_headers"
import { SERVER_GET_WIZARDS_URL } from "../../configs/_server"
import { WizardServerFormFormat } from "../../interfaces/WizardFormat_Server"
import { MappedUserResultsType, ServerResultsType } from "../types"
// Actions:
import { UIAction } from "../action-types/UI"
import { UserRoleTypes } from "../action-types/User"
import { WizardStatsAction, WizardStatsActionTypes } from "../action-types/WizardStats"
import { ExtractDataToStatsWizard } from "../../configs/_parser"
import { PushFeedback } from "../actions/UI"
import { fake_form, fake_server_answer, WizardFormat } from "../../interfaces/WizardFormat"
// Configs:

// Utils:


// Map Results To State
export const MapResultsToState = () => async (dispatch: Dispatch<WizardStatsAction | UIAction>, getState: () => RootState): Promise<void> =>
{ 
  // Validate before entering stats
  const { UserData, isAuthed } = getState().user
  const { token } = getState().auth
  // Validate user before request:
  if (!token || !isAuthed || !UserData || (UserData.role !== UserRoleTypes.ADMIN && UserData.role !== UserRoleTypes.WIZARD_CREATOR)) {
    // -- unauthorized - only users can fill wizard forms
    dispatch({type: WizardStatsActionTypes.STATS_AUTH_FAIL})
    return
  } 

  // Map Results To State
  try {

    const server_res = await axios.get(
      SERVER_GET_WIZARDS_URL,
      {headers: _headers(token)}
    )
    // Mapping results to state
    const {content, results} = server_res.data.results
    console.log("Content: " + content)
    console.log("Results: " + results)
    // Parse results
    // const wizard_content: WizardServerFormFormat = JSON.parse(content)    // the wizard structure
    // const results_content: ServerResultsType[] = JSON.parse(results)      // all results
    const wizard_content: WizardFormat[] = fake_form
    const results_content: ServerResultsType[] = fake_server_answer
    // Dispatch results to state
    dispatch({
      type: WizardStatsActionTypes.MAP_RESULTS_TO_STATE,
      payload: {
        // Wizard: wizard_content,
        Wizard: wizard_content[0],
        AllAnswers: ExtractDataToStatsWizard(results_content)
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
  }
}




// Extract Wizard form to state
// @param id<string> : wizard id to extract
// export const ExtractWizardForm = (id: string) => async (dispatch: Dispatch<WizardFormAction>, getState: () => RootState): Promise<void> => {

//   // Extract wizard form to state:
//   const { UserData, isLoading, isAuthed } = getState().user
//   const { token } = getState().auth
//   // Validate user before request:
//   if (!token || !UserData || UserData.role !== UserRoleTypes.USER) {
//     // -- unauthorized - only users can fill wizard forms
//     dispatch({type: WizardFormActionTypes.FORM_AUTH_FAIL})
//     return
//   }  
//   try {
//     // Request specific wizard
//     // const server_res = await axios.get(SERVER_GET_WIZARDS_URL + id, {headers: _headers(token)})

//     // // Extract specific wizard
//     // const data: any = server_res.data.result
//     // console.log(data)
//     // let wizard: WizardFormat = ExtractDataToWizard(data)
//     // make form format
//     let answer_format: WizardFormFormat = RenderInitForm(fake_wizard[0])
//     console.log(answer_format)
//     // Success - save to global state
//     dispatch<WizardFormAction>({
//       type: WizardFormActionTypes.EXTRACT_WIZARD_FORM,
//       payload: {
//         wizard: answer_format
//       }
//     })

//   }
//   catch (err: any) {
//     // wizard not found
//     console.log(err)
//     // dispatch({type: WizardFormActionTypes.WIZARD_NOT_FOUND})
//   }
// }


// // Send answer by server format
// export const SendAnswer = () => async (dispatch: Dispatch<WizardFormAction | UIAction>, getState: () => RootState): Promise<void> =>
// {

//   // Check authorization
//   // States:
//   const { Page: CurrPage, PageIdx } = getState().wizard_form
//   const { UserData } = getState().user
//   const { token } = getState().auth

//   // Validate user before request:
//   if (!token || !UserData || UserData.role !== UserRoleTypes.USER) {
//     // -- unauthorized - only users can fill wizard forms
//     dispatch({type: WizardFormActionTypes.FORM_AUTH_FAIL})
//     return
//   }  

//   // Check page only if exists
//   if (CurrPage === null) {
//     dispatch(PushFeedback(false, "Cant Move while page doesn't exist"))
//     return
//   }

//   try {
//     // Movement forward is conditional
//     const parsed_page = RenderToServerFormPage(CurrPage, false)
//     dispatch(SaveAnswerPageAction(parsed_page, PageIdx))    // -- save current page
//     dispatch(PushFeedback(true, "Submitted!"))     // -- success msg
//     return

//     // Request specific wizard
//     // const server_res = await axios.get(SERVER_GET_WIZARDS_URL + id, {headers: _headers(token)})

//     // // Extract specific wizard
//     // const data: any = server_res.data.result
//     // console.log(data)
//     // let wizard: WizardFormat = ExtractDataToWizard(data)
//     // make form format
//     let answer_format: WizardFormFormat = RenderInitForm(fake_wizard[0])
//     console.log(answer_format)
//     // Success - save to global state
//     dispatch<WizardFormAction>({
//       type: WizardFormActionTypes.EXTRACT_WIZARD_FORM,
//       payload: {
//         wizard: answer_format
//       }
//     })

//   }
//   catch (err: any) {
//     // wizard not found
//     console.log(err)
//     dispatch(PushFeedback(false, err.message))
//     // dispatch({type: WizardFormActionTypes.WIZARD_NOT_FOUND})
//   }
// }
