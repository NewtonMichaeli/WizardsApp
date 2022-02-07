import React from 'react'
// Assets:
import Add from '../../assets/wizard-controllers/add.png'
// Styles:
import Styles from '../../styles/components/DashboardAddWizard.module.css'

// Dashboard Add Wizard component
const DashboardAddWizard: React.FC = () => {

    return (
        <div className={Styles["DashboardAddWizard"]} title="Add New Wizard">
            <img draggable='false' src={Add} alt="Add New Wizard" />
        </div>
    )
}

export default DashboardAddWizard
