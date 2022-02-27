// Wizard Form
import React, { useState } from 'react'
// Assets:
import Loading from '../assets/loading-1.gif'
// Redux:
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, WizardEditorActions } from '../redux'
import { wizard_form_state_type } from '../redux/types/reducerStateTypes'
import { MovePage } from '../redux/actions/WizardEditor'
// Styles:
import Styles from '../styles/pages/WizardEditor.module.css'
import { getStyles } from '../controllers'
// Components:
import Section from '../components/WizardForm/Wizard.Section'
import { BtnFinish, BtnLeave, BtnPageBack, BtnPageNext } from '../components/HeaderControllers'


const WizardForm: React.FC = () => {
  
  // Dispatch
  const dispatch = useDispatch()
  // States:
  const { SaveChanges } = bindActionCreators<RootState, any>(WizardEditorActions, dispatch)

  // Curent page & wizard:
  const { PageIdx, Wizard, Page } = useSelector<RootState, wizard_form_state_type>(state => state.wizard_form)

  if (Wizard) return (
    <div className={Styles["WizardStats"]}>
      <div className={Styles["wizard-content-container"]}>
        {/* header */}
        <section className={Styles["container-header"]}>
          <h1 className={Styles["wizard-title"]}>
            Currently Answering: {Wizard?.name}
          </h1>
          <h5 className={Styles["page-counter"]}>
            Page {PageIdx + (Wizard?.pages.length ? 1 : 0)} out of {Wizard?.pages.length}
          </h5>
          <div className={Styles["page-controllers"]}>
            <BtnPageBack onClick={()=>dispatch(MovePage('BACK'))} />
            <BtnPageNext onClick={()=>dispatch(MovePage('NEXT'))} />
            <BtnLeave />
            <BtnFinish onClick={SaveChanges} />
          </div>
        </section>
        {/* {body */}
        <section className={Styles["container-body"]}>

          {/* map through sections */}
          {Page?.map((section, i) => 
            <Section 
              key={i}
              section={section} />
          )}

        </section>
      </div>
    </div>
  )
  else return (
    <div className={Styles["WizardStats"]}>
        <div className={getStyles(Styles, "wizard-content-container wizard-content-container-loading")}>
          <img src={Loading} alt="Loading Wizard.." />
        </div>
    </div>
  )
}

export default WizardForm
