// Action types for User

import { WizardFormat } from "../../interfaces/WizardFormat";

// Action types
export enum UserActionTypes {
    TRY_LOAD_USER = "TRY_LOAD_USER",
    LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
    AUTH_FAIL = "AUTH_FAIL"
}

export enum UserRoleTypes {
    USER = "User",
    WIZARD_CREATOR = "Wizard Creator",
    ADMIN = "Admin"
}
  
interface AuthFailAction {
    type: UserActionTypes.AUTH_FAIL
}
  
interface LoadUserSuccessAction {
    type: UserActionTypes.LOAD_USER_SUCCESS
    payload: {
        UserData: {
            username: string
            email: string
            role: UserRoleTypes.ADMIN
                | UserRoleTypes.USER
                | UserRoleTypes.WIZARD_CREATOR
            wizards: WizardFormat[]
        }
    }
}

interface TryLoadUserAction {
    type: UserActionTypes.TRY_LOAD_USER
}

  
// Action types for UI Action
export type UserAction = 
    TryLoadUserAction | LoadUserSuccessAction | AuthFailAction
  