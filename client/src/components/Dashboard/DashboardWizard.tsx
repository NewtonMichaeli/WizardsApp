import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
// assets:
import Delete from '../../assets/wizard-controllers/delete.png'
import Edit from '../../assets/wizard-controllers/edit.png'
import View from '../../assets/wizard-controllers/view.png'
import Options from '../../assets/Q-controllers/options.png'
// Types:
import { WizardFormat } from '../../interfaces/WizardFormat'
import { RootState, UserActions } from '../../redux'
import { UserRoleTypes } from '../../redux/action-types/User'
import { user_state_type } from '../../redux/types/reducerStateTypes'
// Styles:
import Styles from '../../styles/components/Dashboard/DashboardWizard.module.css'


type DashboardWizard__props = React.FC<{
    wizard: WizardFormat
}>
const DashboardWizard: DashboardWizard__props = ({wizard}) => {

    // Dispatch
    const dispatch = useDispatch()
    // States
    const { UserData } = useSelector<RootState, user_state_type>(state => state.user)
    // Handlers
    const { DeleteWizard } = bindActionCreators(UserActions, dispatch)
    const viewHandler = () => window.location.href = '/view/' + wizard.id
    const editHandler = () => window.location.href = '/edit/' + wizard.id
    const deleteHandler = () => {
        if (window.confirm("Are you sure you wanna delete " + wizard.name + '?'))
            DeleteWizard(wizard.id)
    }
    
    return (
        <div className={Styles["DashboardWizard"]}>
            <section className={Styles["nameinfo"]}>
                <h1 className={Styles["user-name"]}>Artemix</h1>
                <span className={Styles["line"]} />
                <h2 className={Styles["wizard-name"]}>
                    {wizard.name}</h2>
            </section>
            <section className={Styles["wizardinfo"]}>
                <h4 className={Styles["wizardinfo-id"]}>
                    {wizard.pages.length} Pages • 29 Dec, 2021
                </h4>
            </section>
            <section className={Styles["wizard-controllers"]}>
                {/* options */}
                {/* <img draggable='false' src={Options} onClick={viewHandler} alt="Options" title="Options" /> */}
                {/* view wizard stats */}
                <img draggable='false' src={View} onClick={viewHandler} alt="View Wizard" title="View Wizard" />
                {/* edit wizard */}
                {UserData?.role === UserRoleTypes.WIZARD_CREATOR &&
                    <img draggable='false' src={Edit} onClick={editHandler} alt="Edit Wizard" title="Edit Wizard" />}
                {/* delete wizard */}
                <img draggable='false' src={Delete} onClick={deleteHandler} alt="Delete Wizard" title="Delete Wizard" />
            </section>
        </div>
    )
}


export default DashboardWizard