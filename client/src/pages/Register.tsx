import React, { useState } from "react"
import { NavLink } from "react-router-dom"
// Assets:
import UserImg from "../assets/user.png"
import EmailImg from "../assets/email.png"
import PwdImg from "../assets/password.png"
// Utils:
import { registerHandler } from "../utils/handlers/Register"
import { Feedback__props } from "../interfaces/Feedback"
import { getStyles } from "../controllers"
// Styles:
import Styles from "../styles/pages/Login.module.css"
// Components:
import Feedback from "../components/Feedback"

// Login Page
const Register: React.FC = () => {

    const [feedback, setFeedback] = useState<Feedback__props>({
        status: false,
        data: ""
    })

    return (
        <div className={Styles["Login"]}>
            <div className={Styles["login-container"]}>
                <section className={Styles["login-header-section"]}>
                    <h1>Sign Up</h1>
                </section>
                <form onSubmit={e=>registerHandler(e, setFeedback)} className={Styles["login-form-section"]}>
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
                {/* feedback - position absolute */}
                <Feedback status={feedback.status}
                        data={feedback.data} />
                </form>
            </div>
        </div>
    )
}

export default Register