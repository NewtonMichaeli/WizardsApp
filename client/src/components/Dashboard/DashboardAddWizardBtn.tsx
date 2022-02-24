import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Assets:
import Add from '../../assets/wizard-controllers/add.png'
import { RootState } from '../../redux'
import { AbortAddingWizard, AddingWizard } from '../../redux/actions/User'
import { user_state_type } from '../../redux/types/reducerStateTypes'
// Styles:
import Styles from '../../styles/components/Dashboard/DashboardAddWizardBtn.module.css'

// Dashboard Add Wizard component
const DashboardAddWizardBtn: React.FC = () => {

    // Dispatch
    const dispatch = useDispatch()
    // State
    const { UserData } = useSelector<RootState, user_state_type>(state => state.user)
    // Handlers
    const addingWizardHandler = () => {
        if (UserData?.isAddingWizard === false)
            dispatch(AddingWizard())
    }
    
    return (
        <div onClick={addingWizardHandler} className={Styles["DashboardAddWizardBtn"]} title="Add New Wizard">
            <img draggable='false' src={Add} alt="Add New Wizard" />
        </div>
    )
}

export default DashboardAddWizardBtn
