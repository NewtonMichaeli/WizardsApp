// Reducer's initial state types

import { WizardFormat } from "../../interfaces/WizardFormat";
import { UserRoleTypes } from "../action-types/User";


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
