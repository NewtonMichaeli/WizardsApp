import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
// assets:
import Delete from '../../assets/wizard-controllers/delete.png'
import Edit from '../../assets/wizard-controllers/edit.png'
import View from '../../assets/wizard-controllers/view.png'
import CopyLink from '../../assets/wizard-controllers/link.png'
// Types:
import { WizardFormat } from '../../interfaces/WizardFormat'
import { RootState, UserActions } from '../../redux'
import { UserRoleTypes } from '../../redux/action-types/User'
import { user_state_type } from '../../redux/types/reducerStateTypes'
// Styles:
import Styles from '../../styles/components/Dashboard/DashboardWizard.module.css'
import { CLIENT_URI } from '../../configs/_server'
import { PushFeedback } from '../../redux/actions/UI'


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
    const copyLinkHandler = () => {
        window.navigator.clipboard.writeText(`${CLIENT_URI}/wizard/${wizard.id}`)
        .then(res => dispatch(PushFeedback(true, "Link copied to Clipboard!")))
    }
    const formatDateHandler = (date_number: number): string => {
        // 29 Dec, 2021
        const date = new Date(date_number)
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`
    }
    const viewHandler = () => window.location.href = '/view/' + wizard.id
    const editHandler = () => window.location.href = '/edit/' + wizard.id
    const deleteHandler = () => {
        if (window.confirm("Are you sure you wanna delete " + wizard.name + '?'))
            DeleteWizard(wizard.id)
    }
    
    return (
        <div className={Styles["DashboardWizard"]}>
            <section className={Styles["nameinfo"]}>
                <h1 className={Styles["user-name"]}>{UserData?.username}</h1>
                <span className={Styles["line"]} />
                <h2 className={Styles["wizard-name"]}>
                    {wizard.name}</h2>
            </section>
            <section className={Styles["wizardinfo"]}>
                <h4 className={Styles["wizardinfo-id"]}>
                    {wizard.pages.length} Pages • {formatDateHandler(wizard.DoC)}
                </h4>
            </section>
            <section className={Styles["wizard-controllers"]}>
                {/* view wizard stats */}
                <div className={Styles["control-btn"]}>
                    <img draggable='false' src={View} onClick={viewHandler} alt="View Wizard" title="View Wizard" />
                </div>
                {/* options */}
                <div className={Styles["control-btn"]}>
                    <img draggable='false' src={CopyLink} onClick={copyLinkHandler} alt="Copy Link" title="Copy Link" />
                </div>
                {/* edit wizard */}
                {UserData?.role === UserRoleTypes.WIZARD_CREATOR &&
                    <div className={Styles["control-btn"]}>
                        <img draggable='false' src={Edit} onClick={editHandler} alt="Edit Wizard" title="Edit Wizard" />
                    </div>}
                {/* delete wizard */}
                <div className={Styles["control-btn"]}>
                    <img draggable='false' src={Delete} onClick={deleteHandler} alt="Delete Wizard" title="Delete Wizard" />
                </div>
            </section>
        </div>
    )
}


export default DashboardWizard