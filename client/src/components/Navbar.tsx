import React from 'react'
// Controllers:
import { getStyles } from '../controllers'
// Styles:
import Styles from "../styles/components/Navbar.module.css"

const Navbar:React.FC = () => {
    return (
        <>
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
                    <section className={Styles["nav-profile-section"]}>
                        <span>Profile</span>
                    </section>
                </div>
            </div>

        </>
    )
}

export default Navbar
