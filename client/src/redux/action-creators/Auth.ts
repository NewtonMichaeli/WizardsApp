// Action Creators for User Authorization

import axios from "axios"
import React from "react"
// Types:
import { Dispatch } from "redux"
import { AuthAction, AuthActionTypes } from "../action-types/Auth"
import { UIAction } from "../action-types/UI"
import { PushFeedback } from '../actions/UI'
// Server configs:
import { SERVER_CREATE_WIZARDCREATOR_URL, SERVER_SIGNIN_URL, SERVER_SIGNUP_URL } from "../../configs/_server"
import { RootState } from "../store"
import { UserRoleTypes } from "../action-types/User"
import { _headers } from "../../configs/_headers"


// Sign In Action creator, called directly from <Login> component
export const SignIn = (e: React.FormEvent<HTMLFormElement>) => async (dispatch: Dispatch<AuthAction | UIAction>): Promise<void> =>
{
  e.preventDefault()
  const email: string = (e.target as any)[0].value,
    password: string = (e.target as any)[1].value

  // Validate inputs
  if (email.length > 32 || email.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Email length should be between 6 - 32 characters"))
    return
  }
  if (password.length > 32 || password.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Password length should be between 6 - 32 characters"))
    return
  }

  // After validation - send request to server
  try {
    console.log('signin')
    const res = await axios.post(SERVER_SIGNIN_URL, { email, password })
    // Login Succeed
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: {
        token: res.data['token']
      }
    })
    // // Clear UI feedback
    dispatch(PushFeedback(true, "Logged in successfully"))
  }
  catch (err: any) {
    // Login Failed
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL
    })
    // Set error feedback
    dispatch(PushFeedback(false, err?.response?.message ?? err?.response?.data ?? "an error has occured"))
  }
}


// SignUp Action
export const SignUp = (e: React.FormEvent<HTMLFormElement>) => async (dispatch: Dispatch<AuthAction | UIAction>) =>
{
  e.preventDefault()
  const name: string = (e.target as any)[0].value,
    email: string = (e.target as any)[1].value,
    password: string = (e.target as any)[2].value

  // Validate inputs
  if (name.length > 32 || name.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Username length should be between 6 - 32 characters"))
    return
  }
  if (email.length > 32 || email.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Email length should be between 6 - 32 characters"))
    return
  }
  if (password.length > 32 || password.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Password length should be between 6 - 32 characters"))
    return
  }

  try {
    console.log('signup')
    const res = await axios.post(SERVER_SIGNUP_URL, { name, email, password })
    // Register Succeed
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: {
        token: res.data['token']
      }
    })
    // Clear UI feedback
    // dispatch(ClearFeedback())
  }
  catch (err: any) {
    // Register Failed
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL
    })
    // Set error feedback
    dispatch(PushFeedback(false, err?.response?.message ?? err?.response?.data ?? "an error has occured"))
  }
}


export const CreateWizardCreator = (e: React.FormEvent<HTMLFormElement>) => async (dispatch: Dispatch<AuthAction | UIAction>, getState: () => RootState) =>
{
  e.preventDefault()
  const name: string = (e.target as any)[0].value,
    email: string = (e.target as any)[1].value,
    password: string = (e.target as any)[2].value

  // States:
  const { token } = getState().auth
  const { UserData } = getState().user

  // Validate role
  if (!token || UserData?.role !== UserRoleTypes.ADMIN) {
    dispatch({ type: AuthActionTypes.AUTH_FAIL })
    return
  }

  // Validate inputs
  if (name.length > 32 || name.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Username length should be between 6 - 32 characters"))
    return
  }
  if (email.length > 32 || email.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Email length should be between 6 - 32 characters"))
    return
  }
  if (password.length > 32 || password.length < 6) {
    // Set error feedback - short email
    dispatch(PushFeedback(false, "Password length should be between 6 - 32 characters"))
    return
  }

  try {
    console.log('create-wizard-creators')
    const res = await axios.post(SERVER_CREATE_WIZARDCREATOR_URL, {
        name, 
        email, 
        password,
        role: "wizardCreator"
      },
      {headers: _headers(token)}
    )
    // Register Succeed
    console.log('success')
    // dispatch({ type: AuthActionTypes.CREATE_WIZARD_CREATOR_SUCCESS })
    // // success msg
    // dispatch(PushFeedback(true, 'WizardCreator Created successfully'))
  }
  catch (err: any) {
    // Register Failed
    dispatch({ type: AuthActionTypes.AUTH_FAIL })
    // Set error feedback
    // dispatch(PushFeedback(false, err?.response?.message ?? err?.response?.data ?? "an error has occured"))
  }
}
