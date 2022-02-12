// Wizard Statistics Viewer
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// Redux:
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
// Styles:
import Styles from '../styles/pages/WizardStats.module.css'
import { getStyles } from '../controllers'

// Stats mode type - <stats> option or <results> option:
const enum StatsMode_types {
  STATS = "STATS",
  RESULTS = "RESULTS"
}
type StatsMode_type = StatsMode_types.RESULTS | StatsMode_types.STATS

const WizardStats: React.FC = () => {

  const { id } = useParams();

  const UserData = useSelector<RootState, RootState['user']['UserData']>(state => state.user.UserData)

  const CurrWizard = UserData?.wizards.filter(wizard => wizard.id === id)[0] ?? null
  console.log(CurrWizard)
  
  const [StatsMode, setStatsMode] = useState<StatsMode_type>(
    StatsMode_types.STATS
  )

  if (CurrWizard) return (
    <div className={Styles["WizardStats"]}>
      <div className={Styles["wizard-content-container"]}>
        <section className={Styles["container-header"]}>
          <section className={Styles["header-top"]}>
            <h1 className={Styles["wizard-title"]}>
              Currently Viewing: {CurrWizard?.name}
            </h1>
            <h5 className={Styles["page-counter"]}>
              Page 1 out of {CurrWizard?.pages.length}
            </h5>
            <div className={Styles["page-controllers"]}>
              controllers
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
        {/* {id} */}
      </div>
    </div>
  )
  else return (
    <div className={Styles["WizardStats"]}>
        <div className={getStyles(Styles, "wizard-content-container wizard-content-container-404")}>
          Wizard not found
        </div>
    </div>
  )
}

export default WizardStats
