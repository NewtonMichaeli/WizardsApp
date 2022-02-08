// Utils for login page

import { SignIn } from "../_requests/Auth"
import { Feedback__props } from '../../interfaces/Feedback'

interface signIn__props {
    (
        e: React.FormEvent<HTMLFormElement>,
        setFeedback: React.Dispatch<React.SetStateAction<Feedback__props>>
    ): void
}
// Sign In Handler
export const signInHandler: signIn__props = async (e, setFeedback) => {
    e.preventDefault()
    const email: string = (e.target as any)[0].value,
        password: string = (e.target as any)[1].value
    // validate inputs
    if (email.length > 32 || email.length < 3) return
    if (password.length > 32 || password.length < 3) return
    // send to server..
    const res = await SignIn(email, password)
    console.log(res)
    setFeedback({
        status: res.success,
        data: res.data || "an error has occured"
    })
    // update token if success
    if (res.success === true)
        window.localStorage.setItem('auth-token', res.data)
}