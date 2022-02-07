import React from "react"
import { NavLink } from "react-router-dom"
// Interface:
import { Login__Props } from "../interfaces/Login"
// Styles:
import Styles from "../styles/pages/Login.module.css"
import UserImg from "../assets/user.png"
import PwdImg from "../assets/password.png"

// Sign In Handler
const signInHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username: string = (e.target as any)[0].value,
        password: string = (e.target as any)[1].value
    // validate inputs
    if (username.length > 32 || username.length < 3) return
    if (password.length > 32 || password.length < 3) return
    // send to server..
}

// Login Page
const Login: React.FC = () => {
    return (
        <div className={Styles["Login"]}>
            <div className={Styles["login-container"]}>
                <section className={Styles["login-header-section"]}>
                    <h1>Sign In</h1>
                </section>
                <form onSubmit={e=>signInHandler(e)} className={Styles["login-form-section"]}>
                <div className={Styles["input-struct-container"]}>
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
                        <img src={PwdImg} alt="Password" />
                        <input
                            type="password"
                            name="password"
                            className={Styles["input-password"]}
                            placeholder="Password" 
                            minLength={3}
                            maxLength={32} />
                    </div>
                    <NavLink to="/signup" className={Styles["link"]}>Don’t Have An Account? Sign Up</NavLink>
                </div>
                <button className={Styles["login-submit-btn"]}>SIGN IN</button>
                </form>
            </div>
        </div>
    )
}

export default Login