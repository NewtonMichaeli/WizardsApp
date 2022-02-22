// Action Creators for User Authorization

import axios from "axios"
import React from "react"
// Types:
import { Dispatch } from "redux"
import { AuthAction, AuthActionTypes } from "../action-types/Auth"
import { UIAction, UIActionTypes } from "../action-types/UI"
import { PushFeedback, ClearFeedback } from './UI'
// Server configs:
import { SERVER_SIGNIN_URL, SERVER_SIGNUP_URL } from "../../configs/_server"

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
