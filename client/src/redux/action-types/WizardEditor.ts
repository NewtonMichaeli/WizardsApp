// Action types for User

import { WizardFormat } from "../../interfaces/WizardFormat";

export enum ElementTypes {
  PAGE = "PAGE",
  SECTION = "SECTION",
  QUESTION = "QUESTION"
}

// Action types
export enum WizardEditorActionTypes {
  EXTRACT_WIZARD = "EXTRACT_WIZARD",
  AUTH_FAIL = "AUTH_FAIL",
  MOVE_PAGE = "MOVE_PAGE",
  // Enter/abort modifying mode
  ADDING_ELEMENT = "ADDING_ELEMENT",  // adding mode
  RELOCATING_ELEMENT = "RELOCATING_ELEMENT",  // relocating mode
  ABORT_ELEMENT_MODE = "ABORT_ELEMENT_MODE",
  // Modify elements
  ADD_ELEMENT = "ADD_ELEMENT",
  RELOCATE_ELEMENT = "RELOCATE_ELEMENT",
  // 
  REMOVE_ELEMENT = "REMOVE_ELEMENT"
}

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
      page: string
    }
  }
}
// Add Element / Section / Page
export type AddElementAction = AddQuestionAction | AddPageAction | AddSectionAction


// Add-Element Action
interface RemoveQuestionAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
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
interface RemoveSectionAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
  payload: {
    element: ElementTypes.SECTION
    path: {
      page: number
      section: number
    }
  }
}
// Add-Page Action
interface RemovePageAction {
  type: WizardEditorActionTypes.REMOVE_ELEMENT
  payload: {
    element: ElementTypes.PAGE
    path: {
      page: number
    }
  }  
}
// Add Element / Section / Page
export type RemoveElementAction = RemoveQuestionAction | RemoveSectionAction | RemovePageAction



// Adding mode
interface AddingElementAction {
  type: WizardEditorActionTypes.ADDING_ELEMENT,
  payload: ElementTypes.PAGE | ElementTypes.SECTION | ElementTypes.QUESTION
}
// Relocating mode
interface RelocatingElementAction {
  type: WizardEditorActionTypes.RELOCATING_ELEMENT,
  payload: ElementTypes.PAGE | ElementTypes.SECTION | ElementTypes.QUESTION
}
// Abort Element Mode Action
interface AbortElementModeAction {
  type: WizardEditorActionTypes.ABORT_ELEMENT_MODE
}


// Action types for WizardEditor Action
export type WizardEditorAction = ExtractWizardAction
  | AuthFailAction 
  | MovePageAction 
  | AddElementAction
  | RemoveElementAction
  | AddingElementAction       // changing mode
  | RelocatingElementAction   // changing mode
  | AbortElementModeAction    // changing mode (abort)
  