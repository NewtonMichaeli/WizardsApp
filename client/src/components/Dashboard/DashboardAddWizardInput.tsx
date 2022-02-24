import React, { useState } from 'react'
import { getStyles } from '../../controllers'
// Assets:
import Delete from '../../assets/wizard-controllers/delete.png'
import Save from '../../assets/wizard-controllers/red-yes.png'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { AbortAddingWizard } from '../../redux/actions/User'
import { bindActionCreators } from 'redux'
import { RootState, UserActions } from '../../redux'
import { user_state_type } from '../../redux/types/reducerStateTypes'
// Styles:
import Styles from '../../styles/components/Dashboard/DashboardAddWizardInput.module.css'
import { PushFeedback } from '../../redux/actions/UI'

// Dashboard - Add Wizard Input component
const DashboardAddWizardInput: React.FC = () => {

    // Dispatch
    const dispatch = useDispatch()
    // States
    const [wizard_name, setWizardName] = useState("")
    const [hasWizardRequested, setHasWizardRequested] = useState(false)
    const { UserData } = useSelector<RootState, user_state_type>(state => state.user)
    // Handlers
    const { AddWizard } = bindActionCreators(UserActions, dispatch)
    const inputHandler = () => {
        if (wizard_name.length < 3) {
            dispatch(PushFeedback(false, "Wizard name length should be between 3-24 characters"))
        }
        else if (!hasWizardRequested) {
            setHasWizardRequested(true)
            AddWizard(wizard_name)
        }
    }
    const abortAddingWizardHandler = () => {
        if (UserData?.isAddingWizard === true && !hasWizardRequested)
            dispatch(AbortAddingWizard())
    }

    return (
        <div className={getStyles(Styles, "DashboardWizardBox DashboardAddWizardInput")}>
            <section className={Styles["nameinfo"]}>
                <h1 className={Styles["user-name"]}>Artemix</h1>
                <span className={Styles["line"]} />
                <input autoFocus type="text" 
                onChange={e => setWizardName(e.target.value)}
                className={Styles["wizard-name-input"]}
                placeholder="Enter Wizard Name" />
            </section>
            <section className={Styles["controllers"]}>
                {/* create wizard */}
                <img onClick={inputHandler} 
                draggable='false' src={Save} alt="Save" title='Save' />
                {/* abort creating wizard */}
                <img className={hasWizardRequested?"btn-disabled":""} onClick={abortAddingWizardHandler}
                draggable='false' src={Delete} alt="Delete" title='Delete' />
            </section>
        </div>
    )
}


export default DashboardAddWizardInput