// Action types for User

import { InputTypes, ValidInputType, WizardFormat, WizardPageFormat, WizardSectionFormat } from "../../interfaces/WizardFormat";


export enum QuestionTypes {
  LABEL = "Label",
  TEXT = "Text",
  CHECKBOX = "Checkbox",
  IMAGE = "Image",
  TEXTAREA = "Textarea",
  SECURED_INPUT = "SecuredInput",
  RADIOBOX_LIST = "Radiobox List",
  CHECKBOX_LIST = "Checkbox List",
  LISTS_LIST = "Lists List",
  RANGE = "Range",
  RADIOBOX = "Radiobox",
}

export enum ElementTypes {
  PAGE = "PAGE",
  SECTION = "SECTION",
  QUESTION = "QUESTION"
}

export enum WizardEditorActionTypes {
  EXTRACT_WIZARD = "EXTRACT_WIZARD",
  AUTH_FAIL = "AUTH_FAIL",
  MOVE_PAGE = "MOVE_PAGE",
  // Status Indicators
  ADDING_ELEMENT = "ADDING_ELEMENT",  // adding mode
  RELOCATING_ELEMENT = "RELOCATING_ELEMENT",  // relocating mode
  ABORT_ELEMENT_MODE = "ABORT_ELEMENT_MODE",
  // Enter/abort modifying mode
  ADD_ELEMENT = "ADD_ELEMENT",
  REMOVE_ELEMENT = "REMOVE_ELEMENT",
  // Modifying Element Properties
  MODIFY_ELEMENT = "MODIFY_ELEMENT",
  // ELEMENT_PROP_REQUIRED = "ELEMENT_PROP_REQUIRED",
  // RELOCATE_ELEMENT = "RELOCATE_ELEMENT",
}


/** Simple Action Types */

// Extract wizard from user wizards
interface ExtractWizardAction {
  type: WizardEditorActionTypes.EXTRACT_WIZARD,
  payload: WizardFormat | null
}

// Extract wizard from user wizards
interface AuthFailAction {
  type: WizardEditorActionTypes.AUTH_FAIL
}

// Move page (forwards/backwards via payload instruction)
interface MovePageAction {
  type: WizardEditorActionTypes.MOVE_PAGE,
  payload: "NEXT" | "BACK"
}


/** Add Element Types */

// Add-Element Action
interface AddQuestionAction {
  type: WizardEditorActionTypes.ADD_ELEMENT
  payload: {
    element: ElementTypes.QUESTION
    path: {
      page: number
      section: number
      question: number
    }
  }
}
// Add-Section Action
interface AddSectionAction {
  type: WizardEditorActionTypes.ADD_ELEMENT
  payload: {
    element: ElementTypes.SECTION
    path: {
      page: number
      section: number
    }
  }
}
// Add-Page Action
interface AddPageAction {
  type: WizardEditorActionTypes.ADD_ELEMENT
  payload: {
    element: ElementTypes.PAGE
    path: {
      page: number
    }
  }
}
// Add Element - Question / Section / Page
export type AddElementAction = AddQuestionAction | AddPageAction | AddSectionAction


/** Remove Element Types */

// Remove-Element Action
interface RemoveQuestionAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
  payload: AddQuestionAction['payload']
}
// Remove-Section Action
interface RemoveSectionAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
  payload: AddSectionAction['payload']
}
// Remove-Page Action
interface RemovePageAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
  payload: AddPageAction['payload']
}
// Remove Element - Question / Section / Page
export type RemoveElementAction = RemoveQuestionAction | RemoveSectionAction | RemovePageAction


/** Change Element Property */

type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<T>
export type ValidInputTypeProps = OptionalProperties<ValidInputType, 'name' | 'title'>
// Modify Question Action (with optional properties to change)
export interface ModifyQuestionAction {
  type: WizardEditorActionTypes.MODIFY_ELEMENT
  payload: {
    element: ElementTypes.QUESTION
    properties: ValidInputTypeProps
    path: {
      page: number
      section: number
      question: number
    }
  }
}
// Modify Section Action (with optional properties to change)
export interface ModifySectionAction {
  type: WizardEditorActionTypes.MODIFY_ELEMENT
  payload: {
    element: ElementTypes.SECTION
    name: WizardSectionFormat['name']
    path: {
      page: number
      section: number
    }
  }
}
// Modify Element Action - Section / Question
export type ModifyElementAction = ModifyQuestionAction | ModifySectionAction


/** States - indicating Current Modifying Mode */

// Adding mode
interface AddingElementAction {
  type: WizardEditorActionTypes.ADDING_ELEMENT,
  payload: {
    type: ElementTypes,
    question?: QuestionTypes
  }
}
// Relocating mode
interface RelocatingElementAction {
  type: WizardEditorActionTypes.RELOCATING_ELEMENT,
  payload: ElementTypes
}
// Abort Element Mode Action
interface AbortElementModeAction {
  type: WizardEditorActionTypes.ABORT_ELEMENT_MODE
}



// Action types for WizardEditor Action
export type WizardEditorAction = ExtractWizardAction
  | AuthFailAction 
  | MovePageAction 
  | AddElementAction          // add element
  | ModifyElementAction       // modify element
  | RemoveElementAction       // remove element
  | AddingElementAction       // changing mode
  | RelocatingElementAction   // changing mode
  | AbortElementModeAction    // changing mode (abort)
  