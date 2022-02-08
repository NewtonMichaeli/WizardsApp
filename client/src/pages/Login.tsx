import React, { useState } from "react"
import { NavLink } from "react-router-dom"
// Utils:
import { signInHandler } from "../utils/handlers/Login"
// Styles:
import Styles from "../styles/pages/Login.module.css"
import UserImg from "../assets/user.png"
import PwdImg from "../assets/password.png"
// Components:
import Feedback from "../components/Feedback"
import { Feedback__props } from "../interfaces/Feedback"

// Login Page
const Login: React.FC = () => {

    const [feedback, setFeedback] = useState<Feedback__props>({
        status: false,
        data: ""
    })

    return (
        <div className={Styles["Login"]}>
            <div className={Styles["login-container"]}>
                <section className={Styles["login-header-section"]}>
                    <h1>Sign In</h1>
                </section>
                <form onSubmit={e=>signInHandler(e, setFeedback)} className={Styles["login-form-section"]}>
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
                    {/* feedback - position absolute */}
                    <Feedback status={feedback.status}
                        data={feedback.data} />
                </form>
            </div>
        </div>
    )
}

export default Login