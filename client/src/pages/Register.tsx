import React from "react"
import { NavLink } from "react-router-dom"
import { getStyles } from "../controllers"
// Interface:
import { Login__Props } from "../interfaces/Login"
// Styles:
import Styles from "../styles/pages/Login.module.css"
import UserImg from "../assets/user.png"
import EmailImg from "../assets/email.png"
import PwdImg from "../assets/password.png"

// Sign In Handler
const registerHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username: string = (e.target as any)[0].value,
        email: string = (e.target as any)[1].value,
        password: string = (e.target as any)[2].value
    // validate inputs
    if (username.length > 32 || username.length < 3) return
    if (email.length > 32 || email.length < 3) return
    if (password.length > 32 || password.length < 3) return
    // send to server..
}

// Login Page
const Register: React.FC = () => {
    return (
        <div className={Styles["Login"]}>
            <div className={Styles["login-container"]}>
                <section className={Styles["login-header-section"]}>
                    <h1>Sign Up</h1>
                </section>
                <form onSubmit={e=>registerHandler(e)} className={Styles["login-form-section"]}>
                <div className={getStyles(Styles, "input-struct-container input-struct-container_register")}>
                    <div className={Styles["input-struct"]}>
                        <img src={UserImg} alt="Username" />
                        <input 
                            type="text"
                            name="username"
                            className={Styles["input-username"]} 
                            placeholder="Username"
                            minLength={3}
                            maxLength={32} />
                    </div>
                    <div className={Styles["input-struct"]}>
                        <img src={EmailImg} alt="Email" />
                        <input
                            type="email"
                            name="email"
                            className={Styles["input-email"]}
                            placeholder="Email"
                            minLength={3}
                            maxLength={32} />
                    </div>
                    <div className={Styles["input-struct"]}>
                        <img src={PwdImg} alt="Password" />
                        <input
                            type="password"
                            name="password"
                            className={Styles["input-password"]}
                            placeholder="Password"
                            autoComplete="off"
                            minLength={3}
                            maxLength={32} />
                    </div>
                    <NavLink to="/signin" className={Styles["link"]}>Already Have An Account? Sign In</NavLink>
                </div>
                <button className={Styles["login-submit-btn"]}>SIGN UP</button>
                </form>
            </div>
        </div>
    )
}

export default Register