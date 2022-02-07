import React from 'react'
// assets:
import Delete from '../../assets/wizard-controllers/delete.png'
import Edit from '../../assets/wizard-controllers/edit.png'
import View from '../../assets/wizard-controllers/view.png'
// Styles:
import Styles from '../../styles/components/DashboardWizard.module.css'

const DashboardWizard: React.FC = (wizard: any) => {
    return (
        <div className={Styles["DashboardWizard"]}>
            <section className={Styles["nameinfo"]}>
                <h1 className={Styles["user-name"]}>Artemix</h1>
                <span className={Styles["line"]} />
                <h2 className={Styles["wizard-name"]}>
                    Wizard 1.0</h2>
            </section>
            <section className={Styles["wizardinfo"]}>
                <h4 className={Styles["wizardinfo-id"]}>21 Pages • 29 Dec, 2021</h4>
            </section>
            <section className={Styles["wizard-controllers"]}>
                <img draggable='false' src={View} alt="View Wizard" title="View Wizard" />
                <img draggable='false' src={Edit} alt="Edit Wizard" title="Edit Wizard" />
                <img draggable='false' src={Delete} alt="Delete Wizard" title="Delete Wizard" />
            </section>
        </div>
    )
}

export default DashboardWizard