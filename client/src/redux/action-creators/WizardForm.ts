// Action Creators for WizardForm functionallity

import axios from "axios"
import { Dispatch } from "redux"
// Types:
import { RootState } from ".."
import { SERVER_FILL_WIZARD_URL, SERVER_GET_WIZARDS_URL } from "../../configs/_server"
import { UserRoleTypes } from "../action-types/User"
import { WizardFormFormat } from "../../interfaces/WizardFormat_Form"
// Actions:
import { WizardFormAction, WizardFormActionTypes } from "../action-types/WizardForm"
// Configs:
import { _headers } from "../../configs/_headers"
import { fake_wizard } from "../../interfaces/WizardFormat"
// Utils:
import { RenderInitForm } from "../../utils/WizardForm/RenderInitFormElement"
import { MovePageAction, SaveAnswerPageAction, SavePageWithErrors as SavePageIdxWithErrors } from "../actions/WizardForm"
import { SavePageAnswersToServerFormat } from "../../utils/WizardForm/RenderServerFormElement"
import { PushFeedback } from "../actions/UI"
import { UIAction } from "../action-types/UI"
import { ResultQuestions, ServerResultsType } from "../types"
import { AuthAction, AuthActionTypes } from "../action-types/Auth"


// Move Page action (if answers are valid till now)
// @param direction : backwards / forwards
export const MovePage = (dir: "BACK" | "NEXT") => async (dispatch: Dispatch<WizardFormAction | UIAction>, getState: () => RootState): Promise<void> =>
{
  const { Wizard, Page: CurrPage, PageIdx  } = getState().wizard_form
  if (CurrPage === null) {
    dispatch(PushFeedback(false, "Cant Move while page doesn't exist"))
    return
  }

  // Can Move Back
  if (dir === "BACK") {
    dispatch(MovePageAction("BACK"))
    dispatch(PushFeedback(true, "Saved changes"))
    return
  }
  
  // Movement forward is conditional
  try {
    const parsed_page = SavePageAnswersToServerFormat(CurrPage, false)
    dispatch(SaveAnswerPageAction(parsed_page))    // -- save current page
    dispatch(SavePageIdxWithErrors(PageIdx, 'REMOVE'))    // -- save page idx with error
    dispatch(MovePageAction("NEXT"))
  }
  catch (e: any) {
    // Go Next page but save errors-page-idx
    if (Wizard?.canNavigate) {
      dispatch(SavePageIdxWithErrors(PageIdx, 'ADD'))    // -- save page idx with error
      dispatch(MovePageAction("NEXT"))
    } 
    // Warn user (can't go next because errors)
    else dispatch(PushFeedback(false, e.message))
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
    const server_res = await axios.get(SERVER_GET_WIZARDS_URL + id, {headers: _headers(token)})

    // Extract specific wizard
    const { content } = server_res.data
    let wizard: WizardFormFormat = RenderInitForm(JSON.parse(content))
    console.log(wizard)
    // Success - save to global state
    dispatch<WizardFormAction>({
      type: WizardFormActionTypes.EXTRACT_WIZARD_FORM,
      payload: { wizard }
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
  const { Page: CurrPage, Wizard, Answer, PagesWithErrors } = getState().wizard_form
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
  
  // Check if any page has errors before sending
  if (PagesWithErrors.length) {
    dispatch(PushFeedback(false, `There's an incomplete input field(s), at page ${PagesWithErrors[0] + 1}.`))
    return
  }  

  try {
    // Movement forward is conditional
    const parsed_page: ResultQuestions = SavePageAnswersToServerFormat(CurrPage, false)
    dispatch(SaveAnswerPageAction(parsed_page))    // -- save current page
    
    // Build server-formatted filled-wizard answer
    const AnswerToServer: ServerResultsType = {
      username: UserData.username,
      email: UserData.email,
      data: {
        ...Answer,
        ...parsed_page
      }
    }

    // Send Answer
    const server_res = await axios.post(
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
    dispatch(PushFeedback(false, err.message ?? err.data ?? "An error has occured"))
  }
}
