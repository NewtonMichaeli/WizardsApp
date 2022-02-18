// Reducer's initial state types

import { WizardFormat, WizardPageFormat } from "../../interfaces/WizardFormat";
import { UserRoleTypes } from "../action-types/User";
import { ElementTypes, WizardEditorActionTypes } from "../action-types/WizardEditor";


// Auth state type
export interface auth_state_type
{
  token: string | null,
  isAuthed: boolean | null,
  isLoading: boolean,
}

// UI state type
export interface ui_state_type {
  status: boolean
  msg: string | null
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
  ActionTriggerType: 
    ElementTypes.PAGE | 
    ElementTypes.SECTION | 
    ElementTypes.QUESTION | null
  ActionType:
    WizardEditorActionTypes.ADDING_ELEMENT |
    WizardEditorActionTypes.RELOCATING_ELEMENT | null
  // current wizard state - questions, sections, etc.. :
  WizardState: WizardFormat | null
  Page: WizardPageFormat | null
  PageIdx: number
}