import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
// Assets:
import UserImg from "../assets/user.png"
import EmailImg from "../assets/email.png"
import PwdImg from "../assets/password.png"
// Redux:
import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
// Utils:
import { AuthActions } from "../redux"
import { TOKEN_NAME } from "../configs/_storage"
import { SetPageTitle } from "../redux/actions/User"
// Styles:
import Styles from "../styles/pages/Login.module.css"
import { getStyles } from "../controllers"
import { AuthAction, AuthActionTypes } from "../redux/action-types/Auth"
// Components:


// Login Page
const Register: React.FC = () => {

    // Dispatch
    const dispatch = useDispatch()
    if (localStorage.getItem(TOKEN_NAME) !== null)
        dispatch<AuthAction>({type: AuthActionTypes.AUTH_FAIL})
    useEffect(() => {dispatch(SetPageTitle('Register'))}, [])  // -- set title current page
    // Handlers
    const { SignUp } = bindActionCreators(AuthActions, useDispatch())    

    return (
        <div className={Styles["Login"]}>
            <div className={Styles["login-container"]}>
                <section className={Styles["login-header-section"]}>
                    <h1>Sign Up</h1>
                </section>
                <form onSubmit={e=> SignUp(e)} className={Styles["login-form-section"]}>
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
                {/* <Feedback status={feedback.status} msg={feedback.msg} /> */}
                </form>
            </div>
        </div>
    )
}

export default Register