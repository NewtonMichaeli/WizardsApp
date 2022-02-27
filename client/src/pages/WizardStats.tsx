// Wizard Statistics Viewer
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// Assets:
import Loading from '../assets/loading-1.gif'
// Redux:
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
// Styles:
import Styles from '../styles/pages/WizardStats.module.css'
import { getStyles } from '../controllers'
// Components:
import Section from '../components/WizardStats/Wizard.Section'
import { BtnFinish, BtnPageBack, BtnPageNext } from '../components/HeaderControllers'
import { wizard_editor_state_type } from '../redux/types/reducerStateTypes'


// Stats mode type - <stats> option or <results> option:
const enum StatsMode_types {
  STATS = "STATS",
  RESULTS = "RESULTS"
}
type StatsMode_type = StatsMode_types.RESULTS | StatsMode_types.STATS

const WizardStats: React.FC = () => {

  const { id } = useParams();

  const { UserData, isLoading, isAuthed } = useSelector<RootState, RootState['user']>(state => state.user)
  const { Page, PageIdx, WizardState } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)

  // State for viewing mode - <stats> option or <results> option:
  const [StatsMode, setStatsMode] = useState<StatsMode_type>(StatsMode_types.STATS)

  if (!isLoading) return (
    <div className={Styles["WizardStats"]}>
      <div className={Styles["wizard-content-container"]}>
        {/* header */}
        <section className={Styles["container-header"]}>
          <section className={Styles["header-top"]}>
            <h1 className={Styles["wizard-title"]}>
              Currently Viewing: {WizardState?.name}
            </h1>
            <h5 className={Styles["page-counter"]}>
              Page {PageIdx} out of {WizardState?.pages.length}
            </h5>
            <div className={Styles["page-controllers"]}>
              <BtnPageBack onClick={()=>2} />
              <BtnPageNext onClick={()=>2} />
              <BtnFinish onClick={()=>2} />
            </div>
          </section>
          <section className={Styles["header-btm"]}>
            <button 
              onClick={()=>setStatsMode(StatsMode_types.STATS)} 
              className={Styles[StatsMode===StatsMode_types.STATS
                ? "btn-selected"
                : ""]}>
                Statistics
            </button>
            <div className={Styles["line"]}></div>
            <button 
              onClick={()=>setStatsMode(StatsMode_types.RESULTS)} 
              className={Styles[StatsMode===StatsMode_types.RESULTS
                ? "btn-selected"
                : ""]}>
                Results
            </button>
          </section>
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

export default WizardStats
