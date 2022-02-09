// Actions configurations file

/** Actions */

// User authentication - action types
export const UI_Actions = {
  CLEAR_FEEDBACK: "CLEAR_FEEDBACK",
  SET_FEEDBACK: "SET_FEEDBACK"
}

// User authentication - action types
export const AuthActions = {
  USER_LOADED: "USER_LOADED",
  USER_LOADING: "USER_LOADING",
  AUTH_ERROR: "AUTH_ERROR",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL"
}

/** Action types */

// UI types
export interface UI_ActionType {
  type: "CLEAR_FEEDBACK" | "SET_FEEDBACK"
  payload: {
    status: boolean
    msg: string | null
  }
}

// Auth types
export interface Auth_ActionType {
  type: (
    "USER_LOADED" |
    "USER_LOADING" |
    "AUTH_ERROR" |
    "LOGIN_SUCCESS" |
    "LOGIN_FAIL" |
    "LOGOUT_SUCCESS" |
    "REGISTER_SUCCESS" |
    "REGISTER_FAIL"
  )
  payload: {
    token: string
    user: {
      username: string
      email: string
    } | null
  }
}
