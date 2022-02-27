// Action Creators for WizardForm functionallity

import axios from "axios"
import { Dispatch } from "redux"
// Types:
import { RootState } from ".."
import { SERVER_GET_WIZARDS_URL } from "../../configs/_server"
import { UserRoleTypes } from "../action-types/User"
import { WizardFormFormat } from "../../interfaces/WizardFormat_Form"
// Actions:
import { WizardFormAction, WizardFormActionTypes } from "../action-types/WizardForm"
// Configs:
import { _headers } from "../../configs/_headers"
import { fake_wizard } from "../../interfaces/WizardFormat"
import { WizardServerFormFormat } from "../../interfaces/WizardFormat_Server"
// Utils:
import { ExtractDataToWizard } from "../../configs/_parser"
import { RenderInitForm } from "../../utils/WizardForm/RenderInitFormElement"
import { MovePageAction } from "../actions/WizardForm"
import { RenderToServerFormPage } from "../../utils/WizardForm/RenderServerFormElement"
import { PushFeedback } from "../actions/UI"
import { UIAction } from "../action-types/UI"


// Move Page action (if answers are valid till now)
export const MovePage = (dir: "BACK" | "NEXT") => async (dispatch: Dispatch<WizardFormAction | UIAction>, getState: () => RootState): Promise<void> =>
{
  const CurrPage = getState().wizard_form.Page  
  if (CurrPage === null) {
    dispatch(PushFeedback(false, "Cant Move while page doesn't exist"))
    return
  }

  // Can Move Back
  if (dir === "BACK") {
    const parsed_page = RenderToServerFormPage(CurrPage, true)  // save and move page back (check later)
    dispatch(MovePageAction("BACK"))
    return
  }
  
  // Movement forward is conditional
  try {
    const parsed_page = RenderToServerFormPage(CurrPage, false)
    
  }
  catch (e: any) {
    dispatch(PushFeedback(false, e.message))
  }
}




// Extract Wizard form to state
// @param id<string> : wizard id to extract
export const ExtractWizardForm = (id: string) => async (dispatch: Dispatch<WizardFormAction>, getState: () => RootState): Promise<void> => {

  // Extract wizard form to state:
  const { UserData, isLoading, isAuthed } = getState().user
  const { token } = getState().auth
  // Validate user before request:
  if (!token || !UserData || UserData.role !== UserRoleTypes.USER) {
    // -- unauthorized - only users can fill wizard forms
    dispatch({type: WizardFormActionTypes.FORM_AUTH_FAIL})
    return
  }  
  try {
    // Request specific wizard
    // const server_res = await axios.get(SERVER_GET_WIZARDS_URL + id, {headers: _headers(token)})

    // // Extract specific wizard
    // const data: any = server_res.data.result
    // console.log(data)
    // let wizard: WizardFormat = ExtractDataToWizard(data)
    // make form format
    let answer_format: WizardFormFormat = RenderInitForm(fake_wizard[0])
    console.log(answer_format)
    // Success - save to global state
    dispatch<WizardFormAction>({
      type: WizardFormActionTypes.EXTRACT_WIZARD_FORM,
      payload: {
        wizard: answer_format
      }
    })

  }
  catch (err: any) {
    // wizard not found
    console.log(err)
    // dispatch({type: WizardFormActionTypes.WIZARD_NOT_FOUND})
  }
}


// Send answer by server format
export const SendAnswer = () => async (dispatch: Dispatch<WizardFormAction>, getState: () => RootState): Promise<void> =>
{
  
  // Check authorization
  const { UserData, isLoading, isAuthed } = getState().user
  const { token } = getState().auth
  // Validate user before request:
  if (!token || !UserData || UserData.role !== UserRoleTypes.USER) {
    // -- unauthorized - only users can fill wizard forms
    dispatch({type: WizardFormActionTypes.FORM_AUTH_FAIL})
    return
  }  
  try {
    // Request specific wizard
    // const server_res = await axios.get(SERVER_GET_WIZARDS_URL + id, {headers: _headers(token)})

    // // Extract specific wizard
    // const data: any = server_res.data.result
    // console.log(data)
    // let wizard: WizardFormat = ExtractDataToWizard(data)
    // make form format
    let answer_format: WizardFormFormat = RenderInitForm(fake_wizard[0])
    console.log(answer_format)
    // Success - save to global state
    dispatch<WizardFormAction>({
      type: WizardFormActionTypes.EXTRACT_WIZARD_FORM,
      payload: {
        wizard: answer_format
      }
    })

  }
  catch (err: any) {
    // wizard not found
    console.log(err)
    // dispatch({type: WizardFormActionTypes.WIZARD_NOT_FOUND})
  }
}
