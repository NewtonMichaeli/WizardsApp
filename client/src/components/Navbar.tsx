import React, { useState } from 'react'
// Controllers:
import { getStyles } from '../controllers'
// Styles:
import Styles from "../styles/components/Navbar.module.css"
import ProfileWindow from './ProfileWindow'

const Navbar:React.FC = () => {
    // Profile window status - closed/opened
    const [profileWin, toggleProfileWin] = useState(false)

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
                <section onClick={() => toggleProfileWin(s=>!s)} className={Styles["nav-profile-section"]}>
                    <span>Artemix</span>
                </section>
            </div>
            {profileWin && <ProfileWindow />}
        </div>
    )
}

export default Navbar
