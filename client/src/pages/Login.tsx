import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
// Assets:
import EmailImg from "../assets/email.png"
import PwdImg from "../assets/password.png"
// Redux:
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
// Utils:
import { AuthActions, RootState } from "../redux"
// Styles:
import Styles from "../styles/pages/Login.module.css"
// Components:
import { TOKEN_NAME } from "../configs/_storage"
import { SetPageTitle } from "../redux/actions/User"
import { AuthAction, AuthActionTypes } from "../redux/action-types/Auth"


// Login Page
const Login: React.FC = () => {

    // Dispatch
    const dispatch = useDispatch()
    if (localStorage.getItem(TOKEN_NAME) !== null)
        dispatch<AuthAction>({type: AuthActionTypes.AUTH_FAIL})
    useEffect(() => {dispatch(SetPageTitle('Login'))}, [])  // -- set title current page
    // Handlers
    const { SignIn } = bindActionCreators(AuthActions, useDispatch())

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
                    {/* <Feedback status={feedback.status} msg={feedback.msg} /> */}
                </form>
            </div>
        </div>
    )
}

export default Login