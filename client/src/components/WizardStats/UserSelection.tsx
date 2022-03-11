// User Selection (RESULTS mode)

import React from "react"
import { useDispatch, useSelector } from "react-redux"
// Types:
import { RootState } from "../../redux"
import { wizard_stats_state_type } from "../../redux/types/reducerStateTypes"
// Actions:
import { InspectUsername } from "../../redux/actions/WizardStats"
// Styles:
import Styles from '../../styles/components/WizardStats/UserSelection.module.css'
import { SelectChange } from "../../utils/WizardEditor/types"


const UserSelection: React.FC = () => {

  // Dispatch
  const dispatch = useDispatch()
  // States
  const { AllAnswers, StatsMode } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  const Usernames: string[] = AllAnswers ? Object.keys(AllAnswers) : []
  // Handlers
  const showUsernameResults = (e: SelectChange) => dispatch(InspectUsername(e.target.value))

  // show only on 'results' tab
  if (StatsMode === "RESULTS") return (
    <select className={Styles["UserSelection"]} title='Watch Results for a specific User' onChange={showUsernameResults} defaultValue={Usernames[0] ?? ''}>
      {/* map usernames to selection */}
      {Usernames.map((username, i) => 
        <option key={i} value={username}>{username}</option>)}
    </select>
  )
  // don't show on any other tab
  else return <></>
}

export default UserSelection