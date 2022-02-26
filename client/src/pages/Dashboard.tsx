import React from 'react'
// Assets:
import Loading from '../assets/loading-1.gif'
// Redux:
import { RootState } from '../redux'
import { useSelector } from 'react-redux'
// Styles:
import Styles from '../styles/pages/Dashboard.module.css'
import { getStyles } from '../controllers'
// Components:
import DashboardWizard from '../components/Dashboard/DashboardWizard'
import DashboardAddWizardBtn from '../components/Dashboard/DashboardAddWizardBtn'
import DashboardAddWizardInput from '../components/Dashboard/DashboardAddWizardInput'
// static wizards data
import { user_state_type } from '../redux/types/reducerStateTypes'


// Dashboard page
// Access Roles: Admin, Wizard-creator.
const Dashboard: React.FC = (/* user's wizards data */) => {

    const { UserData } = useSelector<RootState, user_state_type>(state => state.user)

    const RenderDashboardContents = () => 
    <>
        {UserData?.wizards.map(wizard => <DashboardWizard wizard={wizard} key={wizard.id} />)}
        {/* last element - add wizards: */}
        {UserData?.isAddingWizard && <DashboardAddWizardInput />}
        <DashboardAddWizardBtn />
    </>

    return ( 
        <div className={Styles["Dashboard"]}>
            {/* top section - access title */}
            <section className={Styles["access-title"]}>
                <h3 className={Styles["access-title-id"]}>Your Wizards</h3>
            </section>
            {/* mid section - dashboard container body */}
            <section className={getStyles(Styles, `dashboard-container ${UserData?"":"dashboard-container-loading"}`)}>
                {/* mapping through wizards */}
                {UserData
                    ? <RenderDashboardContents />
                    : <img src={Loading} alt="Loading" title="Loading Wizards.." />}
            </section>
            {/* btm section - wizards counter */}
            <section className={Styles["wizards-counter"]}>
                <h2 className={Styles["wizards-counter-id"]}>
                    {UserData?.wizards.length}
                </h2>
            </section>
        </div>
    )
}

export default Dashboard