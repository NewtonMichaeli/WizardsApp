import React from "react"
import { NavLink } from "react-router-dom"
// Assets:
import EmailImg from "../assets/email.png"
import PwdImg from "../assets/password.png"
// Redux:
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux"
// Utils:
import { AuthActions, RootState } from "../redux"
import { ui_state_type } from "../redux/types/reducerStateTypes"
// Styles:
import Styles from "../styles/pages/Login.module.css"
// Components:
import Feedback from "../components/Feedback"
import { TOKEN_NAME } from "../configs/_storage"


// Login Page
const Login: React.FC = () => {

    if (localStorage.getItem(TOKEN_NAME) !== null)
        window.location.href = '/dashboard'

    const { SignIn } = bindActionCreators(AuthActions, useDispatch())

    const feedback = useSelector<RootState, ui_state_type>(state => state.ui)   // -- feedback state

    return (
        <div className={Styles["Login"]}>
            <div className={Styles["login-container"]}>
                <section className={Styles["login-header-section"]}>
                    <h1>Sign In</h1>
                </section>
                <form onSubmit={e => SignIn(e)} className={Styles["login-form-section"]}>
                    <div className={Styles["input-struct-container"]}>
                        <div className={Styles["input-struct"]}>
                            <img src={EmailImg} alt="Username" />
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
                        <NavLink to="/signup" className={Styles["link"]}>Don't Have An Account? Sign Up</NavLink>
                    </div>
                    <button className={Styles["login-submit-btn"]}>SIGN IN</button>
                    {/* feedback - absolute position */}
                    <Feedback status={feedback.status} msg={feedback.msg} />
                </form>
            </div>
        </div>
    )
}

export default Login