// Reducer helpers for User-Reducer

// Utils:
import { RenderInitInput, RenderInitPage, RenderInitSection } from "../../utils/WizardEditor/RenderInitElement";
// Types:
import { input_path_type } from "../../components/WizardEditor/Wizard.Input";
import { InputTypes, ValidInputType } from "../../interfaces/WizardFormat";
import { ElementTypes } from "../types";
import { wizard_editor_state_type } from "../types/reducerStateTypes";
// Actions:
import { AddElementAction, ModifyElementAction, RemoveElementAction, ValidInputTypeProps } from "../action-types/WizardEditor";
import { AddElement, RemoveElement } from "../actions/WizardEditor";


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
    case ElementTypes.PAGE: {
      const { page } = action.payload.path
      state.WizardState?.pages
        .splice(state.PageIdx, 1)
      // dec current page idx
      if (state.PageIdx && state.PageIdx === state.WizardState?.pages?.length)
        state.PageIdx--
      // update current page
      state.Page = state.WizardState?.pages[state.PageIdx] ?? null
      // return state without removed element & reinitiate other states
      return ClearStateSideStats(state)
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
