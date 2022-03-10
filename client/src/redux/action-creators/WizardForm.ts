// Action Creators for WizardForm functionallity

import axios from "axios"
import { Dispatch } from "redux"
// Types:
import { RootState } from ".."
import { SERVER_FILL_WIZARD_URL } from "../../configs/_server"
import { UserRoleTypes } from "../action-types/User"
import { WizardFormFormat } from "../../interfaces/WizardFormat_Form"
// Actions:
import { WizardFormAction, WizardFormActionTypes } from "../action-types/WizardForm"
// Configs:
import { _headers } from "../../configs/_headers"
import { fake_wizard } from "../../interfaces/WizardFormat"
// Utils:
import { RenderInitForm } from "../../utils/WizardForm/RenderInitFormElement"
import { MovePageAction, SaveAnswerPageAction } from "../actions/WizardForm"
import { SavePageAnswersToServerFormat } from "../../utils/WizardForm/RenderServerFormElement"
import { PushFeedback } from "../actions/UI"
import { UIAction } from "../action-types/UI"
import { ResultQuestions, ServerResultsType } from "../types"
import { AuthAction, AuthActionTypes } from "../action-types/Auth"


// Move Page action (if answers are valid till now)
export const MovePage = (dir: "BACK" | "NEXT") => async (dispatch: Dispatch<WizardFormAction | UIAction>, getState: () => RootState): Promise<void> =>
{
  const { Page: CurrPage, PageIdx  } = getState().wizard_form
  if (CurrPage === null) {
    dispatch(PushFeedback(false, "Cant Move while page doesn't exist"))
    return
  }

  // Can Move Back
  if (dir === "BACK") {
    // const parsed_page = SavePageAnswersToServerFormat(CurrPage, true)  // save and move page back (check later)
    dispatch(MovePageAction("BACK"))
    dispatch(PushFeedback(true, "Saved changes"))
    return
  }
  
  // Movement forward is conditional
  try {
    const parsed_page = SavePageAnswersToServerFormat(CurrPage, false)
    dispatch(SaveAnswerPageAction(parsed_page))    // -- save current page
    dispatch(PushFeedback(true, "Saved changes"))     // -- success msg
    dispatch(MovePageAction("NEXT"))
  }
  catch (e: any) {
    dispatch(PushFeedback(false, e.message))
  }
}




// Extract Wizard form to state
// @param id<string> : wizard id to extract
export const ExtractWizardForm = (id: string) => async (dispatch: Dispatch<WizardFormAction | AuthAction>, getState: () => RootState): Promise<void> => {

  // Extract wizard form to state:
  const { UserData, isLoading, isAuthed } = getState().user
  const { token } = getState().auth
  // Validate user before request:
  if (!token || !UserData || UserData.role !== UserRoleTypes.USER) {
    // -- unauthorized - only users can fill wizard forms
    dispatch({type: AuthActionTypes.AUTH_FAIL})
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
export const SendAnswer = () => async (dispatch: Dispatch<WizardFormAction | UIAction | AuthAction>, getState: () => RootState): Promise<void> =>
{

  // Check authorization
  // States:
  const { Page: CurrPage, PageIdx, Wizard, Answer } = getState().wizard_form
  const { UserData } = getState().user
  const { token } = getState().auth

  // Validate user before request:
  if (!token || !UserData || UserData.role !== UserRoleTypes.USER) {
    // -- unauthorized - only users can fill wizard forms
    dispatch({type: AuthActionTypes.AUTH_FAIL})
    return
  }  

  // Check page only if exists
  if (CurrPage === null || Wizard === null) {
    dispatch(PushFeedback(false, "Cant Move while page doesn't exist"))
    return
  }

  try {
    // Movement forward is conditional
    const parsed_page: ResultQuestions = SavePageAnswersToServerFormat(CurrPage, false)
    dispatch(SaveAnswerPageAction(parsed_page))    // -- save current page
    // return

    // Build server-formatted filled-wizard answer
    const AnswerToServer: ServerResultsType = {
      username: UserData.username,
      email: UserData.email,
      data: Answer
    }

    // Send Answer
    const server_res = await axios.post(
      // SERVER_FILL_WIZARD_URL(Wizard.id), 
      SERVER_FILL_WIZARD_URL("1"), 
      {
        filledWizard: AnswerToServer,
        wizardId: Wizard.id
      },
      {headers: _headers(token)}
    )
    
    // success msg
    dispatch(PushFeedback(true, "Answer Submitted!"))
    dispatch({type: WizardFormActionTypes.SEND_ANSWER_SUCCESS})
  }
  catch (err: any) {
    // wizard not found
    console.log(err)
    dispatch(PushFeedback(false, err.message))
    // dispatch({type: WizardFormActionTypes.WIZARD_NOT_FOUND})
  }
}
