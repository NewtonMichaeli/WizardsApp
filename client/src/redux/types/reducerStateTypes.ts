// Reducer's initial state types

import { ElementTypes, QuestionTypes } from ".";
import { WizardFormat, WizardPageFormat } from "../../interfaces/WizardFormat";
import { UserRoleTypes } from "../action-types/User";
import { WizardEditorActionTypes } from "../action-types/WizardEditor";


// Auth state type
export interface auth_state_type
{
  token: string | null,
  isAuthed: boolean | null,
  isLoading: boolean,
}

// UI state type
export interface ui_state_type {
  notifications: {
    status: boolean
    msg: string
    id: number
  }[]
  ui_counter: number
}

// User state type
export interface user_state_type {
  isLoading: boolean
  isAuthed: boolean
  UserData: {
    username: string
    email: string,
    role: UserRoleTypes.USER | UserRoleTypes.WIZARD_CREATOR | UserRoleTypes.ADMIN,
    wizards: WizardFormat[]
  } | null
}

// Wizard_editor state type
export interface wizard_editor_state_type {
  IsAction: boolean
  ActionTrigger: {
    Type: ElementTypes | null
    QuestionType?: QuestionTypes
  }
  ActionType:
    WizardEditorActionTypes.ADDING_ELEMENT |
    WizardEditorActionTypes.RELOCATING_ELEMENT | null
  // current wizard state - questions, sections, etc.. :
  WizardState: WizardFormat | null
  Page: WizardPageFormat | null
  PageIdx: number
}