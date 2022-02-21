// Action Creators for WizardEditor functionallity

import axios from "axios"
// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
import { input_path_type } from "../../components/WizardEditor/Wizard.Input"
import { section_path_type } from "../../components/WizardEditor/Wizard.Section"
import { wizard_editor_state_type } from "../types/reducerStateTypes"
import { InputTypes, ValidInputType } from "../../interfaces/WizardFormat"
import { ElementTypes, QuestionTypes } from '../types'
// Utils:
import { RenderInitInput, RenderInitPage, RenderInitSection } from "../../utils/WizardEditor/RenderInitElement"
// Actions:
import { AddElementAction, ModifyElementAction, ModifyQuestionAction, ModifySectionAction, RemoveElementAction, ValidInputTypeProps, WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"
import { SERVER_UPDATE_WIZARD } from "../../configs/_server"


// Move Page Action
export const MovePage = (dir: "BACK" | "NEXT"): WizardEditorAction => ({
  type: WizardEditorActionTypes.MOVE_PAGE,
  payload: dir
})


// Activate Adding Element State
export const AddingElementMode = (
  element_type: ElementTypes,
  question_type?: QuestionTypes
): WizardEditorAction => ({
  type: WizardEditorActionTypes.ADDING_ELEMENT,
  payload: {
    type: element_type,
    question: question_type
  }
})
// Activate Relocating Element State
export const RelocatingElementMode = (element: ElementTypes): WizardEditorAction => ({
  type: WizardEditorActionTypes.RELOCATING_ELEMENT,
  payload: element
})


// Adding elements to a Wizard
export const AddElement = {
  // Add Question
  Question: (path: input_path_type): AddElementAction => ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: { element: ElementTypes.QUESTION, path }
  }),
  // Add Section
  Section: (path: section_path_type): AddElementAction => ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: { element: ElementTypes.SECTION, path }
  }),
  Page: (page_idx: number): AddElementAction => ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: { element: ElementTypes.PAGE, path: { page: page_idx } }
  })
}


// Removing elements from a Wizard
export const RemoveElement = {
  // Remove Question
  Question: (path: input_path_type): RemoveElementAction => ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: { element: ElementTypes.QUESTION, path }
  }),
  // Remove Section
  Section: (path: section_path_type): RemoveElementAction => ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: { element: ElementTypes.SECTION, path }
  })
}


// Modify Section Action type
  
export const ModifyElement = {
  // Section
  Section: (
    path: section_path_type, 
    properties: string
    ): ModifySectionAction => ({
      type: WizardEditorActionTypes.MODIFY_ELEMENT,
      payload: { element: ElementTypes.SECTION, name: properties, path }
    }),
  // Question
  Question: (
    path: input_path_type, 
    properties: ValidInputTypeProps
  ): ModifyQuestionAction => ({
    type: WizardEditorActionTypes.MODIFY_ELEMENT,
    payload: { element: ElementTypes.QUESTION, properties, path }
  })
}


// Load User Action creator, called directly from <App> component
export const ExtractWizard = (id: string) => (dispatch: Dispatch<WizardEditorAction>, getState: () => RootState): void => {
  
  // Extract wizard from wizards list at <user>
  const { UserData, isLoading, isAuthed } = getState().user
  const CurrWizard = UserData?.wizards?.filter(wizard => wizard.id === id)[0] ?? null
  
  if (isLoading === false && !CurrWizard && isAuthed) {
    // -- wizard not found - gen. auth_fail
    dispatch({type: WizardEditorActionTypes.AUTH_FAIL})
    return
  }
  console.log(CurrWizard);
  
  // Extract wizard on success - save to global state
  dispatch({
    type: WizardEditorActionTypes.EXTRACT_WIZARD,
    payload: CurrWizard
  })
}


// Save Changes
export const SaveChanges = (wizard_id: string) => async (
  dispatch: Dispatch<WizardEditorAction>, getState: () => RootState
): Promise<void> => {

  // Send Changes to server


  try {
    const new_wizard = getState().wizard_editor.WizardState

    // save data in localstorage temporarly
    localStorage.setItem('data', JSON.stringify(new_wizard))
    return

    // const res = await axios.post(SERVER_UPDATE_WIZARD + wizard_id, {
    //   // new wizard details
    //   // ...new_wizard
    // })
  }
  catch (err: any) {
    // Login Failed
    dispatch({type: WizardEditorActionTypes.AUTH_FAIL})
    // Set error feedback
    // dispatch(SetFeedback(false, err?.response?.message ?? err?.response?.data ?? "an error has occured"))
  }

  // Extract wizard on success - save to global state
  // dispatch({
  //   type: WizardEditorActionTypes.EXTRACT_WIZARD,
  //   payload: CurrWizard
  // })
}


// Insert given state while reinitiating side stats (isAction, ActionType, etc..)
export const ClearStateSideStats = (state: wizard_editor_state_type): wizard_editor_state_type => ({
  ...state,
  ActionTrigger: {
    Type: null,
    QuestionType: undefined
  }, ActionType: null, IsAction: false
})


// Add Element to state
export const AddElementToState = (
  state: wizard_editor_state_type, 
  action: AddElementAction,
  init_props?: ValidInputType
): wizard_editor_state_type => {

  // Add en element based on it's element-type
  switch (action.payload.element) {   // -- same as (state.ActionTriger.Type)
    // Adding Question
    case ElementTypes.QUESTION: {

      // Add Question inside given path
      const {page, section, question} = action.payload.path
      
      // insert new element to the given path inside wizard tree
      state.WizardState?.pages[page][section].elements.splice(
        question, 
        0, 
        init_props ?? RenderInitInput(state.ActionTrigger)
      )
      
      // insert new state with new element & reinitiate other states
      return ClearStateSideStats(state);
    }

    // Adding Section
    case ElementTypes.SECTION: {

      // 0 pages - abort
      if (!state.WizardState?.pages)
        return state

      const new_element = RenderInitSection();
      const {page, section} = action.payload.path
      // insert new element to the given path inside wizard tree
      state.WizardState?.pages[page]
        .splice(section, 0, new_element)
      
      // insert new state with new element & reinitiate other states
      return ClearStateSideStats(state);
    }
    // Adding Page
    case ElementTypes.PAGE: {
      const new_element = RenderInitPage();
      const {page} = action.payload.path

      // update 'PageIdx state
      state.PageIdx +=
        (page === state.PageIdx || !state.WizardState?.pages.length) ? 0 : 1

      // insert new element to the given path inside wizard tree
      state.WizardState?.pages.splice(page, 0, new_element)
          
      // update 'Page' state
      state.Page = state.WizardState?.pages[state.PageIdx] ?? null

      // insert new state with new element & reinitiate other states
      return ClearStateSideStats(state);
    }

    default: 
      return state
  }
}


// Remove Element from state
export const RemoveElementFromState = (
  state: wizard_editor_state_type, 
  action: RemoveElementAction
): wizard_editor_state_type => {

  // Remove en element
  switch (action.payload.element) {   // -- same as (state.ActionTriger.Type)
    case ElementTypes.QUESTION: {
      // Remove Question from given path
      const {page, section, question} = action.payload.path
      state.WizardState?.pages[page][section].elements
        .splice(question, 1)
      
      // return new state without removed element & reinitiate other states
      return ClearStateSideStats(state);
    }
    case ElementTypes.SECTION: {
      // Remove Question from given path
      const {page, section} = action.payload.path
      state.WizardState?.pages[page]
        .splice(section, 1)
      
      // return state without removed element & reinitiate other states
      return ClearStateSideStats(state);
    }
    default: 
      return state
  }
}


// Replace given question in a given path
const ReplaceQuestionInState = <T extends ValidInputType>(
  state: wizard_editor_state_type,
  curr_q: ValidInputType,
  properties: ValidInputTypeProps,
  path: input_path_type
) => AddElementToState(
  state,
  AddElement.Question(path),
  {...curr_q as T, ...properties as T}
)


// Modify Element
export const ModifyElementInState = (
  state: wizard_editor_state_type, 
  action: ModifyElementAction
): wizard_editor_state_type => {

  // Modify en element
  switch (action.payload.element) {   // -- same as (state.ActionTriger.Type)
    case ElementTypes.QUESTION: {

      // Modify Question in given path
      const { path, properties } = action.payload
      const {page, section, question} = path
      // GET Old Props from element, REMOVE element and ADD Updated one
      const curr_q = state.WizardState?.pages[page][section].elements[question]
      
      // clear state & reinitiate stats
      ClearStateSideStats(state)
      
      if (!curr_q) return state
      
      // Remove old question
      state = RemoveElementFromState(state, RemoveElement.Question(path))
      
      // Switch possible question types:
      return ReplaceQuestionInState<InputTypes[typeof action.payload.properties.type]>(
        state, 
        curr_q, 
        properties, 
        path
      ) as wizard_editor_state_type
    }
    
    // Modifying section
    case ElementTypes.SECTION: {

      // Modify Question in given path
      const { path, name } = action.payload
      const { page, section } = path

      // GET Old Props from element, REMOVE element and ADD Updated one
      const curr_section = state.WizardState?.pages[page][section]
      
      // invaild section - return cleared & reinitiated state
      if (!curr_section) return ClearStateSideStats(state)
      
      // Update section name
      if (state.WizardState)
        state.WizardState.pages[page][section].name = name

      // Return state with updated section name
      return state
    }
    default: 
      return state
  }
}
