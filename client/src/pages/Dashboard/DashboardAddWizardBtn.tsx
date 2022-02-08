import React from 'react'
// Assets:
import Add from '../../assets/wizard-controllers/add.png'
// Styles:
import Styles from '../../styles/components/DashboardAddWizardBtn.module.css'

// Dashboard Add Wizard component
const DashboardAddWizardBtn: React.FC<any> = ({toggleAddingWizard}) => {

    return (
        <div onClick={() => toggleAddingWizard(true)} className={Styles["DashboardAddWizardBtn"]} title="Add New Wizard">
            <img draggable='false' src={Add} alt="Add New Wizard" />
        </div>
    )
}

export default DashboardAddWizardBtn
