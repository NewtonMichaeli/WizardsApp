import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Redux:
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
// Controllers:
import { getStyles } from '../controllers'
// Styles:
import Styles from "../styles/components/Navbar.module.css"
import ProfileWindow from './ProfileWindow'
import { user_state_type } from '../redux/types/reducerStateTypes'


const Navbar:React.FC = () => {
    // Profile window status - closed/opened
    const [profileWin, toggleProfileWin] = useState(false)
    // user details
    const { UserData, CurrentPageTitle } = useSelector<RootState, user_state_type>(state => state.user)

    return (
        <div className={Styles["Navbar"]}>
            <div className={getStyles(Styles, "nav-item l")}>
                <NavLink className={Styles["app-title"]} to="/">
                    WizardManager
                </NavLink>
            </div>
            <div className={getStyles(Styles, "nav-item m")}>
                <h3 className={Styles["nav-page-identifier"]}>
                    {CurrentPageTitle}
                </h3>
            </div>
            <div className={getStyles(Styles, "nav-item r")}>
                <section onClick={() => toggleProfileWin(s=>(!s && UserData !== null))} className={Styles["nav-profile-section"]}>
                    <span>{UserData ? UserData.username : "Guest"}</span>
                </section>
            </div>
            {profileWin && <ProfileWindow UserData={UserData} />}
        </div>
    )
}

export default Navbar
