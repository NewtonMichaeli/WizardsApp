// Authorization

import axios, { AxiosError } from 'axios'
import GetDashboardWizards from './GetDashboardWizards'

const SERVER_URI = 'http://localhost:5000/'
const SERVER_SIGNIN_URI = SERVER_URI + 'api/auth/signin'
const SERVER_SIGNUP_URI = SERVER_URI + 'api/auth/signup'


/** SIGN IN */

// SignIn function params
export type SignIn_props = {
    (email: string, password: string): Promise<{
        success: boolean,
        data: string
    }>
}
// Tries to sign in
export const SignIn: SignIn_props = async (email, password) =>
{
    try {
        const res = await axios.post(SERVER_SIGNIN_URI, {
            // -- sign in with email & password 
            email, password
        });
        console.log('authed')
        return {
            success: true,
            data: res.data  // new token
        }
    }
    catch (err: any) {
        console.log('not authed')
        return {
            success: false,
            data: err.response?.data || err.response?.message
        }
    }
}


/** SIGN UP */

// SignUp function params
export type SignUp_props = {
    (name: string, email: string, password: string): Promise<{
        success: boolean,
        data: string
    }>
}
// Tries to sign up
export const SignUp: SignUp_props = async (name, email, password) =>
{
    try {
        const res = await axios.post(SERVER_SIGNUP_URI, {
            // -- sign up with name, email & password
            name, email, password
        });
        console.log('authed')
        return {
            success: true,
            data: res.data  // new token
        }
    }
    catch (err: any) {
        console.log('not authed')
        return {
            success: false,
            data: err.response?.data || err.response?.message
        }
    }
}
