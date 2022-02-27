// WizardStats : Header Controllers
import React from 'react'
// Assets:
import Add from '../assets/wizard-controllers/add-white.png'
import Finished from '../assets/wizard-controllers/yes-white.svg'
import Leave from '../assets/wizard-controllers/no-white.png'
import Back from '../assets/wizard-controllers/black-arrow.png'
import Next from '../assets/wizard-controllers/white-arrow-right.png'
// Styles:
import Styles from '../styles/components/HeaderController.module.css'
import { getStyles } from '../controllers'

// Prop types
type BtnPageBack__props = React.FC<{onClick: () => any}>
type BtnPageNext__props = BtnPageBack__props
type BtnFinish__props = BtnPageBack__props
// type BtnLeave__props = BtnPageBack__props
type BtnAdd__props = React.FC<{onClick: () => any, focus: boolean}>


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
export const BtnLeave = () =>
  <button className={Styles["btn-leave"]} title='Discrat changes' 
    onClick={() => AreYouSure("You're about to Discrate changes", () => window.location.href = '/')}>
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


