// Wizard Form
import React, { useState } from 'react'
// Assets:
import Loading from '../assets/loading-1.gif'
// Redux:
import { bindActionCreators } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, WizardEditorActions, WizardFormActions } from '../redux'
import { wizard_form_state_type } from '../redux/types/reducerStateTypes'
// Styles:
import Styles from '../styles/pages/WizardEditor.module.css'
import { getStyles } from '../controllers'
// Components:
import Section from '../components/WizardForm/Wizard.Section'
import { BtnFormNext, BtnLeave, BtnPageBack } from '../components/HeaderControllers'


const WizardForm: React.FC = () => {
  
  // Dispatch
  const dispatch = useDispatch()
  // States
  const { SendAnswer } = bindActionCreators(WizardFormActions, dispatch)
  const { PageIdx, Wizard, Page } = useSelector<RootState, wizard_form_state_type>(state => state.wizard_form)
  // Handlers
  const { MovePage } = bindActionCreators(WizardFormActions, dispatch)


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
            <BtnPageBack onClick={() => MovePage('BACK')} />
            {PageIdx < Wizard.pages.length - 1
              ? <BtnFormNext onClick={() => MovePage("NEXT")} />
              : <BtnFormNext onClick={SendAnswer} isLastPage />}
            <BtnLeave />
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
