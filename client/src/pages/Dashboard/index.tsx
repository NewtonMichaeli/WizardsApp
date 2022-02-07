import React from 'react'
// Styles:
import Styles from '../../styles/pages/Dashboard.module.css'
// Components:
import DashboardWizard from './DashboardWizard'
import DashboardAddWizard from './DashboardAddWizard'
// static wizards data
import data from './fake-wizards.json'

// Dashboard page
const Dashboard: React.FC = (/* user's wizards data */) => {

    

    return (
        <div className={Styles["Dashboard"]}>
            {/* top section - access title */}
            <section className={Styles["access-title"]}>
                <h3 className={Styles["access-title-id"]}>Your Wizards</h3>
            </section>
            {/* mid section - dashboard container body */}
            <section className={Styles["dashboard-container"]}>
                {/* mapping through wizards */}
                {data.map(wizard => 
                    <DashboardWizard key={wizard.name} />
                )}
                {/* last element - add wizards */}
                <DashboardAddWizard />
            </section>
            {/* btm section - wizards counter */}
            <section className={Styles["wizards-counter"]}>
                <h2 className={Styles["wizards-counter-id"]}>
                    {data.length}
                </h2>
            </section>
        </div>
    )
}

export default Dashboard