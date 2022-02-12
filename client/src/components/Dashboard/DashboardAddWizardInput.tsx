import React, { useState } from 'react'
import { getStyles } from '../../controllers'
// Assets:
import Delete from '../../assets/wizard-controllers/delete.png'
import Save from '../../assets/wizard-controllers/red-yes.png'
// Styles:
import Styles from '../../styles/components/Dashboard/DashboardAddWizardInput.module.css'

// Dashboard - Add Wizard Input component
const DashboardAddWizardInput: React.FC<any> = ({toggleAddingWizard, SetData}) => {

    const [input, setInput] = useState("")

    return (
        <div className={getStyles(Styles, "DashboardWizardBox DashboardAddWizardInput")}>
            <section className={Styles["nameinfo"]}>
                <h1 className={Styles["user-name"]}>Artemix</h1>
                <span className={Styles["line"]} />
                <input autoFocus type="text" 
                onChange={e => setInput(e.target.value)}
                className={Styles["wizard-name-input"]}
                placeholder="Enter Wizard Name" />
            </section>
            <section className={Styles["controllers"]}>
                <img onClick={() => inputHandler(input, SetData, toggleAddingWizard)} 
                draggable='false' src={Save} alt="Save" title='Save' />
                <img onClick={() => toggleAddingWizard(false)}
                draggable='false' src={Delete} alt="Delete" title='Delete' />
            </section>
        </div>
    )
}

const inputHandler = 
(input: string, SetData: any, toggleAddingWizard: any) => {
    if (input.length < 3) return
    SetData((data: []) => [...data, {name: input}])
    toggleAddingWizard(false)
}

export default DashboardAddWizardInput