// Wizard Statistics Viewer
import React, { useState } from 'react'
// Assets:
import Loading from '../assets/loading-1.gif'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
// Types:
import { wizard_stats_state_type } from '../redux/types/reducerStateTypes'
import { RootState } from '../redux'
// Styles:
import Styles from '../styles/pages/WizardStats.module.css'
import { getStyles } from '../controllers'
// Components:
import { BtnLeave } from '../components/HeaderControllers'
import PageComponent from '../components/WizardStats/Wizard.Page'
import { SwitchTab } from '../redux/actions/WizardStats'
import UserSelection from '../components/WizardStats/UserSelection'


const WizardStats: React.FC = () => {

  // Dispatch
  const dispatch = useDispatch()
  // States
  const { Wizard, AllAnswers, isLoading, StatsMode } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  // State for viewing mode - <stats> option or <results> option:


  if (!isLoading) return (
    <div className={Styles["WizardStats"]}>
      <div className={Styles["wizard-content-container"]}>
        {/* header */}
        <section className={Styles["container-header"]}>
          <section className={Styles["header-top"]}>
            <h1 className={Styles["wizard-title"]}>
              Currently Viewing: {Wizard?.name}
            </h1>
            <div className={Styles["page-controllers"]}>
              <BtnLeave />
            </div>
          </section>
          <section className={Styles["header-btm"]}>
            <button 
              onClick={() => dispatch(SwitchTab('STATS'))} 
              className={Styles[StatsMode === "STATS"
                ? "btn-selected"
                : ""]}>
                Statistics
            </button>
            <div className={Styles["line"]}></div>
            <button 
              onClick={() => dispatch(SwitchTab("RESULTS"))} 
              className={Styles[StatsMode === "RESULTS"
                ? "btn-selected"
                : ""]}>
                Results
            </button>
          </section>
        </section>
        {/* {body */}
        <section className={Styles["container-body"]}>
          
          <UserSelection />
          {Wizard?.pages.map((page, i) => <PageComponent key={i} page_idx={i} page={page} />)}
        
        </section>
      </div>
    </div>
  )
  // loading gif
  else return (
    <div className={Styles["WizardStats"]}>
        <div className={getStyles(Styles, "wizard-content-container wizard-content-container-loading")}>
          <img src={Loading} alt="Loading Wizard.." />
        </div>
    </div>
  )
}

export default WizardStats
