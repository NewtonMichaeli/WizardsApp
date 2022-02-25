// Actions for WizardEditor

// Types:
import { section_path_type } from "../../components/WizardEditor/Wizard.Section"
import { input_path_type, list_input_path_type, sub_input_path_type } from "../../utils/WizardEditor/types"
import { AddElementAction, ModifyQuestionAction, ModifySectionAction, RemoveElementAction, ValidInputTypeProps, WizardEditorAction, WizardEditorActionTypes } from "../action-types/WizardEditor"
import { ElementTypes, QuestionTypes } from "../types"


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
  // Add SubQuestion
  SubQuestion: (path: sub_input_path_type): AddElementAction => ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: { element: ElementTypes.SUB_QUESTION, path }
  }),
  // Add QuestionList
  QuestionList: (path: list_input_path_type): AddElementAction => ({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: { element: ElementTypes.QUESTION_LIST, path }
  }),
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
  // Remove SubQuestion
  SubQuestion: (path: sub_input_path_type): RemoveElementAction => ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: { element: ElementTypes.SUB_QUESTION, path }
  }),
  // Remove QuestionList
  QuestionList: (path: list_input_path_type): RemoveElementAction => ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: { element: ElementTypes.QUESTION_LIST, path }
  }),
  // Remove Question
  Question: (path: input_path_type): RemoveElementAction => ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: { element: ElementTypes.QUESTION, path }
  }),
  // Remove Section
  Section: (path: section_path_type): RemoveElementAction => ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: { element: ElementTypes.SECTION, path }
  }),
  Page: (page_idx: number): RemoveElementAction => ({
    type: WizardEditorActionTypes.REMOVE_ELEMENT,
    payload: { element: ElementTypes.PAGE, path: { page: page_idx } }
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

