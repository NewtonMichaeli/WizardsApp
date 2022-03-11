// WizardStats : Header Controllers
import React, { useState } from 'react'
// Assets:
import Add from '../assets/wizard-controllers/add-white.png'
import Finished from '../assets/wizard-controllers/yes-white.svg'
import Leave from '../assets/wizard-controllers/no-white.png'
import Back from '../assets/wizard-controllers/black-arrow.png'
import Next from '../assets/wizard-controllers/white-arrow-right.png'
import RequiredTrue from '../assets/wizard-controllers/required-true.png'
import RequiredFalse from '../assets/wizard-controllers/required-false.png'
// Styles:
import Styles from '../styles/components/HeaderController.module.css'
import { getStyles } from '../controllers'
import { bindActionCreators } from 'redux'
import { RootState, WizardEditorActions } from '../redux'
import { useDispatch, useSelector } from 'react-redux'
import { wizard_editor_state_type } from '../redux/types/reducerStateTypes'

// Prop types
type BtnPageBack__props = React.FC<{onClick: () => any}>
type BtnPageNext__props = BtnPageBack__props
type BtnFinish__props = BtnPageBack__props
type BtnAdd__props = React.FC<{onClick: () => any, focus: boolean}>
type BtnFormNext__props = React.FC<{onClick: () => any, isLastPage?: true}>


// Handlers:
const AreYouSure = (q: string, func: () => any) => {
  if (window.confirm(q)) func()
}


// Components:

// Button - goes back 1 page
export const BtnPageBack: BtnPageBack__props = ({onClick}) =>
  <button className={Styles["btn-page-back"]} title='Previous Page' onClick={onClick}>
    <span>Back</span>
    <img src={Back} alt="Back" />
  </button>


// Button - goes forward 1 page
export const BtnPageNext: BtnPageNext__props = ({onClick}) =>
  <button className={Styles["btn-page-next"]} title='Next Page' onClick={onClick}>
    <span>Next</span>
    <img src={Next} alt="Next" />
  </button>


// Button - Finished
export const BtnControlPageNavigation = () => {

  // States:
  const { WizardState } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  // Handlers:
  const { ChangePageNavigation } = bindActionCreators(WizardEditorActions, useDispatch())

  return <button className={Styles["btn-controlPageNavigation"]} title={WizardState?.canNavigate 
    ? 'Disable Navigation' : 'Enable Navigation'} onClick={ChangePageNavigation}>
    <img src={WizardState?.canNavigate ? RequiredFalse : RequiredTrue} alt='Change Navigation Status' />
  </button>
}


// Button - Finished
export const BtnLeave = () =>
  <button className={Styles["btn-leave"]} title='Discrat changes' 
    onClick={() => AreYouSure("You're about to Discrate changes", () => window.location.href = '/signin')}>
    <img src={Leave} alt="Leave" />
  </button>


// Button - Finished
export const BtnFinish: BtnFinish__props = ({onClick}) =>
  <button className={Styles["btn-finished"]} title='Save changes' 
    onClick={() => AreYouSure("You're about to Save changes", onClick)}>
    <img src={Finished} alt="Finished" />
  </button>


// Button - Add
export const BtnAdd: BtnAdd__props = ({onClick, focus}) =>
  <button 
    className={getStyles(Styles, `btn-add ${focus?"onAddMenu":""}`)} 
    title='Add an Element'
    onClick={onClick}>
    <img src={Add} alt="Finished" />
  </button>


// Button - Next/Finished - state dependant
export const BtnFormNext: BtnFormNext__props = ({onClick, isLastPage}) => 
  <button className={Styles["btn-page-next"]} title='Next Page' onClick={onClick}>
    <span>{isLastPage ? "Finish" : "Next"}</span>
    <img src={isLastPage ? Finished : Next} alt="Next" />
  </button>

