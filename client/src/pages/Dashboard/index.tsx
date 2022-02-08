import React, { useState } from 'react'
// Utils:
import GetDashboardWizards, { GetAllWizards_callback_props } from '../../utils/_requests/GetDashboardWizards'
// Styles:
import Styles from '../../styles/pages/Dashboard.module.css'
// Components:
import DashboardWizard from './DashboardWizard'
import DashboardAddWizardBtn from './DashboardAddWizardBtn'
import DashboardAddWizardInput from './DashboardAddWizardInput'
// interfaces:
import { WizardsFormat } from '../../interfaces/WizardFormat'
// static wizards data
import { fake_wizard } from '../../interfaces/WizardFormat'


// Dashboard page
// Access Roles: Admin, Wizard-creator.
const Dashboard: React.FC = (/* user's wizards data */) => {

    const [Data, SetData] = useState<WizardsFormat | null>(fake_wizard)
    
    GetDashboardWizards((status, data) => {
        if (status == true)
            SetData(data)
        else window.location.href = '/signin'
    })

    const [addingWizard, toggleAddingWizard] = useState(false)

    return Data && 
        <div className={Styles["Dashboard"]}>
            {/* top section - access title */}
            <section className={Styles["access-title"]}>
                <h3 className={Styles["access-title-id"]}>Your Wizards</h3>
            </section>
            {/* mid section - dashboard container body */}
            <section className={Styles["dashboard-container"]}>
                {/* mapping through wizards */}
                {
                    Data?.map(wizard => <DashboardWizard SetData={SetData} wizard={wizard} key={wizard.name} />)
                }
                {/* last element - add wizards */}
                {addingWizard && <DashboardAddWizardInput toggleAddingWizard={toggleAddingWizard}
                SetData={SetData} />}
                <DashboardAddWizardBtn toggleAddingWizard={toggleAddingWizard} />
            </section>
            {/* btm section - wizards counter */}
            <section className={Styles["wizards-counter"]}>
                <h2 className={Styles["wizards-counter-id"]}>
                    {fake_wizard.length}
                </h2>
            </section>
        </div>
}

export default Dashboard