// Action Creators for WizardEditor functionallity

// Types:
import { Dispatch } from "redux"
import { RootState } from ".."
import { path_type } from "../../components/WizardEditor/InputField"
import { InputTypes, ValidInputType, WizardSectionFormat } from "../../interfaces/WizardFormat"
import { RenderInitInput } from "../../utils/WizardEditor/RenderInitInput"
import { AddElementAction, ElementTypes, ModifyElementAction, ModifyQuestionAction, ModifySectionAction, QuestionTypes, RemoveElementAction, ValidInputTypeProps, WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"
import { wizard_editor_state_type } from "../types/reducerStateTypes"


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

// Add Element Type
type AddElement__props = (
  element: ElementTypes,
  path: path_type
) => AddElementAction
// Add Element
export const AddElement: AddElement__props = (element, path) => {
  if (element === ElementTypes.PAGE) return ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: {
      element,
      path: {
        page: path.page,
      }
    }
  })
  else if (element === ElementTypes.SECTION) return ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: {
      element,
      path: {
        page: path.page,
        section: path.section,
      }
    }
  })
  else return ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: {
      element,
      path: {
        page: path.page,
        section: path.section,
        question: path.question
      }
    }
  })
}


// Remove Element Type
type RemoveElement__props = (
  element: ElementTypes,
  path: path_type
) => RemoveElementAction
// Remove Element
export const RemoveElement: RemoveElement__props = (element, path) => {
  if (element === ElementTypes.PAGE) return ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: {
      element,
      path: {
        page: path.page,
      }
    }
  })
  else if (element === ElementTypes.SECTION) return ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: {
      element,
      path: {
        page: path.page,
        section: path.section,
      }
    }
  })
  else return ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: {
      element,
      path: {
        page: path.page,
        section: path.section,
        question: path.question
      }
    }
  })
}


// Modify Section Action type
type ModifySection__props = (
  element: ElementTypes.SECTION, 
  path: path_type, 
  properties: string
) => ModifySectionAction
// Modify Section Action
export const ModifySection: ModifySection__props = (element, path, properties) => ({
  type: WizardEditorActionTypes.MODIFY_ELEMENT,
  payload: {
    element: ElementTypes.SECTION,
    name: properties,
    path: {
      page: path.page,
      section: path.section
    }
  }
})
// Modify Question Action type
type ModifyQuestion__props = (
  element: ElementTypes.QUESTION, 
  path: path_type, 
  properties: ValidInputTypeProps
) => ModifyQuestionAction
// Modify Question Action 
export const ModifyQuestion: ModifyQuestion__props = (element, path, properties) => ({
  type: WizardEditorActionTypes.MODIFY_ELEMENT,
  payload: {
    element: ElementTypes.QUESTION,
    properties,
    path: {
      page: path.page,
      section: path.section,
      question: path.question
    }
  }
})


// Load User Action creator, called directly from <App> component
export const ExtractWizard = (id: string) => (dispatch: Dispatch<WizardEditorAction>, getState: () => RootState): void => {

  // Extract wizard from wizards list at <user>
  const { UserData, isLoading, isAuthed } = getState().user

  const CurrWizard = UserData?.wizards.filter(wizard => wizard.id === id)[0] ?? null
  
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


// Add Element to state
export const AddElementToState = (
  state: wizard_editor_state_type, 
  action: AddElementAction,
  init_props?: ValidInputType
) => {

  // Add en element based on it's element-type
  switch (action.payload.element) {   // -- same as (state.ActionTriger.Type)
    case ElementTypes.QUESTION: {
      // Add Question inside given path
      const new_element = RenderInitInput(state.ActionTrigger);
      const {page, section, question} = action.payload.path
      // insert new element to the given path inside wizard tree
      state.WizardState?.pages[page][section].elements
        .splice(question, 0, new_element)
      
      return {
        // insert new state with new element
        ...state,
        // reinitiate other states
        IsAction: false,
        ActionTrigger: {
          Type: null
        },
        ActionType: null
      }
    }
    default: 
      return state
  }

}


// Remove Element from state
export const RemoveElementFromState = (
  state: wizard_editor_state_type, 
  action: RemoveElementAction
) => {

  // Remove en element
  switch (action.payload.element) {   // -- same as (state.ActionTriger.Type)
    case ElementTypes.QUESTION: {
      // Remove Question from given path
      const {page, section, question} = action.payload.path
      state.WizardState?.pages[page][section].elements
        .splice(question, 1)
      
      return {
        // insert new state with new element
        ...state,
        // reinitiate other states
        IsAction: false,
        ActionTrigger: {
          Type: null
        },
        ActionType: null
      }
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
  path: path_type
) => AddElementToState(
  state,
  AddElement(ElementTypes.QUESTION, path),
  {...curr_q as T, ...properties as T}
)
// Create & Add new element


// Modify Element
export const ModifyElementInState = (
  state: wizard_editor_state_type, 
  action: ModifyElementAction
) => {

  // Modify en element
  switch (action.payload.element) {   // -- same as (state.ActionTriger.Type)
    case ElementTypes.QUESTION: {
      // Modify Question in given path
      const {page, section, question} = action.payload.path

      // GET Old Props from element, REMOVE element and ADD Updated one
      const curr_q = state.WizardState?.pages[page][section].elements[question]
      
      if (!curr_q) return state

      // Remove old question
      state = RemoveElementFromState(
        state, RemoveElement(ElementTypes.QUESTION, {page, section, question})
      )
      
      // Switch possible question types:
      switch (state.ActionTrigger.QuestionType)
      {
        case QuestionTypes.CHECKBOX:
          return ReplaceQuestionInState<InputTypes['Checkbox']>(
            state,
            curr_q,
            action.payload.properties,
            action.payload.path
          )
        case QuestionTypes.LABEL: 
          return ReplaceQuestionInState<InputTypes['Label']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.TEXT: 
          return ReplaceQuestionInState<InputTypes['Text']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.TEXTAREA: 
          return ReplaceQuestionInState<InputTypes['Textarea']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.SECURED_INPUT: 
          return ReplaceQuestionInState<InputTypes['SecuredInput']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.RANGE: 
          return ReplaceQuestionInState<InputTypes['Range']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.IMAGE: 
          return ReplaceQuestionInState<InputTypes['Image']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.RADIOBOX_LIST: 
          return ReplaceQuestionInState<InputTypes['Radiobox']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.CHECKBOX_LIST: 
          return ReplaceQuestionInState<InputTypes['Radiobox List']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.LISTS_LIST: 
          return ReplaceQuestionInState<InputTypes['Lists List']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
        case QuestionTypes.RADIOBOX: 
          return ReplaceQuestionInState<InputTypes['Radiobox']>(
          state,
          curr_q,
          action.payload.properties,
          action.payload.path
        )
      }
      
      return {
        // insert new state with new element
        ...state,
        // reinitiate other states
        IsAction: false,
        ActionTrigger: {
          Type: null
        },
        ActionType: null
      }
    }
    default: 
      return state
  }

}