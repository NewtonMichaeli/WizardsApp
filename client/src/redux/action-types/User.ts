// Action types for User

import { WizardFormat } from "../../interfaces/WizardFormat";

// Action types
export enum UserActionTypes {
    TRY_LOAD_USER = "TRY_LOAD_USER",
    LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
    LOAD_WIZARDS_SUCCESS = "LOAD_WIZARDS_SUCCESS",
    // wizard
    ADDING_WIZARD = "ADDING_WIZARD",
    ABORT_ADDING_WIZARD = "ABORT_ADDING_WIZARD",
    ADD_WIZARD_SUCCESS = "ADD_WIZARD_SUCCESS",
    DELETE_WIZARD = "DELETE_WIZARD",
    SET_PAGE_TITLE = "SET_PAGE_TITLE",
}

export enum UserRoleTypes {
    USER = "user",
    WIZARD_CREATOR = "wizardCreator",
    ADMIN = "admin"
}
  
interface SetPageTitleAction {
    type: UserActionTypes.SET_PAGE_TITLE,
    payload: {
        title: string
    }
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
            results: WizardFormat[]
            isAddingWizard: false       // false on load-success
        }
    }
}

interface LoadWizardsSuccessAction {
    type: UserActionTypes.LOAD_WIZARDS_SUCCESS
    payload: {
        UserData: {
            wizards: WizardFormat[]
            results: WizardFormat[]
        }
    }
}

interface TryLoadUserAction {
    type: UserActionTypes.TRY_LOAD_USER
}

interface DeleteWizardAction {
    type: UserActionTypes.DELETE_WIZARD,
    payload: {
        wizard_id: string
    }
}

interface AddingWizardAction {
    type: UserActionTypes.ADDING_WIZARD
}

interface AbortAddingWizardAction {
    type: UserActionTypes.ABORT_ADDING_WIZARD
}

interface AddWizardAction {
    type: UserActionTypes.ADD_WIZARD_SUCCESS,
    payload: {
        new_wizard: WizardFormat
    }
}

  
// Action types for UI Action
export type UserAction = 
    TryLoadUserAction | 
    LoadUserSuccessAction | 
    LoadWizardsSuccessAction |
    DeleteWizardAction |        // remove wizard action
    AddWizardAction |           // add wizard action
    AbortAddingWizardAction |   // abort add wizard action
    SetPageTitleAction |        // set page title at main navbar
    AddingWizardAction          // adding wizard state
  