// Utils for register page

import { SignUp } from "../_requests/Auth"
import { Feedback__props } from '../../interfaces/Feedback'

interface signUp__props {
    (
        e: React.FormEvent<HTMLFormElement>,
        setFeedback: React.Dispatch<React.SetStateAction<Feedback__props>>
    ): void
}
// Sign Up Handler
export const registerHandler: signUp__props = async (e, setFeedback) => {
    e.preventDefault()
    const username: string = (e.target as any)[0].value,
        email: string = (e.target as any)[1].value,
        password: string = (e.target as any)[2].value
    // validate inputs
    if (username.length > 32 || username.length < 3) return
    if (email.length > 32 || email.length < 3) return
    if (password.length > 32 || password.length < 3) return
    // send to server..
    const res = await SignUp(username, email, password)
    setFeedback({
        status: res.success,
        data: res.data || "an error has occured"
    })
    // update token if success
    if (res.success === true)
        window.localStorage.setItem('auth-token', res.data)
}