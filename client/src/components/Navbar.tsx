import React, { useState } from 'react'
// Redux:
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
// Controllers:
import { getStyles } from '../controllers'
// Styles:
import Styles from "../styles/components/Navbar.module.css"
import ProfileWindow from './ProfileWindow'
import { profile } from 'console'

const Navbar:React.FC = () => {
    // Profile window status - closed/opened
    const [profileWin, toggleProfileWin] = useState(false)
    // user details
    const UserData = useSelector((state: RootState) => state.user.UserData)

    return (
        <div className={Styles["Navbar"]}>
            <div className={getStyles(Styles, "nav-item l")}>
                <h1 className={Styles["app-title"]}>
                    WizardManager
                </h1>
            </div>
            <div className={getStyles(Styles, "nav-item m")}>
                <h3 className={Styles["nav-page-identifier"]}>
                    Welcome
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
