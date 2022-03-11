// Action types for WizardEditor

import { ValidInputType, WizardFormat, WizardSectionFormat } from "../../interfaces/WizardFormat";
import { input_path_type, list_input_path_type, sub_input_path_type } from "../../utils/WizardEditor/types";
import { ElementTypes, QuestionTypes } from "../types";


export enum WizardEditorActionTypes {
  EXTRACT_WIZARD = "EXTRACT_WIZARD",
  WIZARD_NOT_FOUND = "WIZARD_NOT_FOUND",
  MOVE_PAGE = "MOVE_PAGE",
  // Status Indicators
  ADDING_ELEMENT = "ADDING_ELEMENT",  // adding mode
  RELOCATING_ELEMENT = "RELOCATING_ELEMENT",  // relocating mode
  ABORT_ELEMENT_MODE = "ABORT_ELEMENT_MODE",
  // Enter/abort modifying mode
  ADD_ELEMENT = "ADD_ELEMENT",
  REMOVE_ELEMENT = "REMOVE_ELEMENT",
  MODIFY_ELEMENT = "MODIFY_ELEMENT",
  SAVE_CHANGES = "SAVE_CHANGES",
  CHANGE_PAGE_NAVIGATION_STATUS = "CHANGE_PAGE_NAVIGATION_STATUS",
}


/** Simple Action Types */

// Extract wizard from user wizards
interface ExtractWizardAction {
  type: WizardEditorActionTypes.EXTRACT_WIZARD,
  payload: WizardFormat | null
}

// Move page (forwards/backwards via payload instruction)
interface MovePageAction {
  type: WizardEditorActionTypes.MOVE_PAGE,
  payload: "NEXT" | "BACK"
}


/** Add Element Types */

// Add-Question-List Action
interface AddQuestionListAction {
  type: WizardEditorActionTypes.ADD_ELEMENT
  payload: {
    element: ElementTypes.QUESTION_LIST
    path: list_input_path_type
  }
}
// Add-Question Action
interface AddQuestionAction {
  type: WizardEditorActionTypes.ADD_ELEMENT
  payload: {
    element: ElementTypes.QUESTION
    path: input_path_type
  }
}
// Add-Sub-Question Action
interface AddSubQuestionAction {
  type: WizardEditorActionTypes.ADD_ELEMENT
  payload: {
    element: ElementTypes.SUB_QUESTION
    path: sub_input_path_type
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
export type AddElementAction = 
  AddQuestionAction | AddPageAction | AddSectionAction | AddQuestionListAction | AddSubQuestionAction


/** Remove Element Types */

// Remove-Question-List Action
interface RemoveQuestionListAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT,
  payload: {
    element: ElementTypes.QUESTION_LIST
    path: list_input_path_type
  }
}
// Remove-Element Action
interface RemoveQuestionAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
  payload: AddQuestionAction['payload']
}

// Remove-Sub-Question Action
interface RemoveSubQuestionAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
  payload: {
    element: ElementTypes.SUB_QUESTION
    path: sub_input_path_type
  }
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
export type RemoveElementAction = 
  RemoveQuestionAction | RemoveSectionAction | RemovePageAction | RemoveQuestionListAction | RemoveSubQuestionAction


/** Change Element Property */

// Makes all (given) key properties optional
export type OptionalProperties<T, K extends keyof T> = Omit<T, K> & Partial<T>
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
// Save Changes
interface SaveChangesAction {
  type: WizardEditorActionTypes.SAVE_CHANGES
}
// Wizard not found
interface WizardNotFoundAction {
  type: WizardEditorActionTypes.WIZARD_NOT_FOUND
}
// Change Page Navigation
interface ChangePageNavigationAction {
  type: WizardEditorActionTypes.CHANGE_PAGE_NAVIGATION_STATUS,
  payload: {
    status: boolean
  }
}



// Action types for WizardEditor Action
export type WizardEditorAction = ExtractWizardAction
  | MovePageAction 
  | AddElementAction          // add element
  | ModifyElementAction       // modify element
  | RemoveElementAction       // remove element
  | AddingElementAction       // changing mode
  | RelocatingElementAction   // changing mode
  | AbortElementModeAction    // changing mode (abort)
  | SaveChangesAction         // save changes
  | WizardNotFoundAction      // wizard not found
  | ChangePageNavigationAction      // change page navigation
