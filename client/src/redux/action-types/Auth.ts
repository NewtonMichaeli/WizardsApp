// Action types for Authorization

// Action types
export enum AuthActionTypes {
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAIL = "LOGIN_FAIL",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAIL = "REGISTER_FAIL",
  ADMIN_AUTH_FAIL = "ADMIN_AUTH_FAIL",
  CREATE_WIZARD_CREATOR_SUCCESS = "CREATE_WIZARD_CREATOR_SUCCESS",
}

interface LoginSuccessAction {
  type: AuthActionTypes.LOGIN_SUCCESS
  payload: {
    token: string
  }
}

interface LoginFailAction {
  type: AuthActionTypes.LOGIN_FAIL
}

interface RegisterSuccessAction {
  type: AuthActionTypes.REGISTER_SUCCESS
  payload: {
    token: string
  }
}

interface RegisterFailAction {
  type: AuthActionTypes.REGISTER_FAIL
}

interface LogoutSuccessAction {
  type: AuthActionTypes.LOGOUT_SUCCESS
}

interface AdminAuthFailAciton {
  type: AuthActionTypes.ADMIN_AUTH_FAIL
}

interface CreateWizardCreatorSuccessAction {
  type: AuthActionTypes.CREATE_WIZARD_CREATOR_SUCCESS
}


// Action types for Authorization Action
export type AuthAction = 
  LoginFailAction | LoginSuccessAction | RegisterSuccessAction | RegisterFailAction | LogoutSuccessAction | AdminAuthFailAciton | 
  CreateWizardCreatorSuccessAction
