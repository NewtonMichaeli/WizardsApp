// Input Utils for Statistic-inputs

import React from "react";
import { useDispatch } from "react-redux";
// Types:
import { QuestionTypes } from "../../redux/types";
// Actions:
import { SwitchTab } from "../../redux/actions/WizardStats";
// Styles:
import Styles from '../../styles/Utils/WizardStats/InputUtils.module.css'


// For textual fields
export const InStatisticableField: React.FC<{type: QuestionTypes}> = ({type}) => {

  // Dispatch
  const dispatch = useDispatch()

  return (
    <h4 className={Styles["InStatisticableField"]} onClick={() => dispatch(SwitchTab('RESULTS'))}>
      Cannot display Stats for {type}.
      <br />
    </h4>
  )
}