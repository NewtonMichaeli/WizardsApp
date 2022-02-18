// Wizard Edirot
import React, { Dispatch, useState } from 'react'
// Assets:
import Loading from '../assets/loading-1.gif'
// Redux:
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux'
import { wizard_editor_state_type } from '../redux/types/reducerStateTypes'
import { MovePage } from '../redux/action-creators/WizardEditor'
// Styles:
import Styles from '../styles/pages/WizardEditor.module.css'
import { getStyles } from '../controllers'
// Components:
import Section from '../components/WizardEditor/Wizard.Section'
import AddMenu from '../components/WizardEditor/AddMenu'
import { BtnAdd, BtnFinish, BtnPageBack, BtnPageNext } from '../components/HeaderControllers'
import { WizardEditorActionTypes } from '../redux/action-types/WizardEditor'


// Stats mode type - <stats> option or <results> option:
const enum StatsMode_types {
  STATS = "STATS",
  RESULTS = "RESULTS"
}
type StatsMode_type = StatsMode_types.RESULTS | StatsMode_types.STATS

const WizardEditor: React.FC = () => {
  
  // States:
  const dispatch = useDispatch()
  // State for toggling element's list:
  const [ElementsListMode, setElementsListMode] = useState(false)
  
  const closeAddMenuHandler = () => {
    if (!ElementsListMode)
      setElementsListMode(true)
    else {
      dispatch({type: 'ABORT_ELEMENT_MODE'})
      setElementsListMode(false)
    }
  }

  // Curent page & wizard:
  const { WizardState, Page, PageIdx } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)

  if (WizardState) return (
    <div className={Styles["WizardStats"]}>
      <div className={Styles["wizard-content-container"]}>
        {/* header */}
        <section className={Styles["container-header"]}>
          <h1 className={Styles["wizard-title"]}>
            Currently Editing: {WizardState?.name}
          </h1>
          <h5 className={Styles["page-counter"]}>
            Page {PageIdx + 1} out of {WizardState?.pages.length}
          </h5>
          <div className={Styles["page-controllers"]}>
            <BtnPageBack onClick={()=>dispatch(MovePage('BACK'))} />
            <BtnPageNext onClick={()=>dispatch(MovePage('NEXT'))} />
            <BtnFinish onClick={()=>2} />
            <BtnAdd focus={ElementsListMode} onClick={closeAddMenuHandler} />
            { ElementsListMode && <AddMenu /> }
          </div>
        </section>
        {/* {body */}
        <section className={Styles["container-body"]}>

          {Page?.map((section, i) => <Section key={i} page_idx={PageIdx} section_idx={i} section={section} />)}
        
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

export default WizardEditor
