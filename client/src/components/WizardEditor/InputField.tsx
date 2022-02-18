// All Input types components, exported seperately
import React from 'react'
// Assets:
import Add from '../../assets/wizard-controllers/add-white.png'
import Required from '../../assets/Q-controllers/password-grey.png'
import Remove from '../../assets/Q-controllers/no-grey.png'
import Options from '../../assets/Q-controllers/options.png'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
// styles:
import Styles from '../../styles/components/WizardEditor/WizardInput.module.css'
// Types:
import { ValidInputType } from '../../interfaces/WizardFormat'
import { RootState } from '../../redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
import { AddElementAction, ElementTypes, WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'


// Input controllers field
type InputControllers__props = React.FC<{
  children: JSX.Element | string
}>
const InputControllers: InputControllers__props = ({children}) => {
  return (
    <section className={Styles["question-controllers"]}>
      <img src={Required} alt="Required" title='Set to Required' />
      <img src={Remove} alt="Remove" title='Remove Question' />
      <img src={Options} alt="Options" title='Options' />
    </section>
  )
}


// Component for  
const AddHere: React.FC<{path: path_type}> = ({path}) => {

  const dispatch = useDispatch<Dispatch<AddElementAction>>()
  // dispatch addHere onClick
  const addHereHandler = () => dispatch({
    type: WizardEditorActionTypes.ADD_ELEMENT,
    payload: {
      element: ElementTypes.QUESTION,
      path: {
        page: path.page_idx,
        section: path.section_idx,
        question: path.q_idx
      }
    }
  })

  return (
    <div className={Styles["Add-Here"]}>
      <section onClick={addHereHandler}>
        <img src={Add} alt="Add Here" title='Add Here' />
      </section>
    </div>
  )
}


export type path_type = {
  page_idx: number,
  section_idx: number,
  q_idx: number
}
// Input Struct : Text, SecuredInput, Textarea, etc..
type InputStruct__props = React.FC<{
  element: ValidInputType,
  path: path_type
}>
export const InputStruct: InputStruct__props = ({element, path}) => {

  // States:
  const {IsAction, ActionType, ActionTriggerType} = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)

  return (
    <div className={Styles["Wizard-Input"]}>
      <div className={Styles["upper-section"]}>
        <input
          type="text"
          id={element.name}
          name={element.name} 
          itemID={element.name}
          placeholder={`Enter ${element.type} Title`}
          />
        <section className={Styles["question-controllers"]}>
          <img src={Required} alt="Required" title='Set to Required' />
          <img src={Remove} alt="Remove" title='Remove Question' />
          <img src={Options} alt="Options" title='Options' />
        </section>
      </div>
      { element.type !== 'Label'
        ? <h1 className={Styles["Input-type-placeholder"]}>{element.type}</h1>
        : ''}
      {/* Add element here */}
      {ActionTriggerType === ElementTypes.QUESTION && <AddHere path={path} />}
    </div>
  )
}


// Input : Label field
export const Label: InputStruct__props
  = ({element, path}) => <InputStruct element={element} path={path} />


// Input : Text field
export const Text: InputStruct__props
  = ({element, path}) => <InputStruct element={element} path={path} />


// Input : Text field
export const Textarea: InputStruct__props
  = ({element, path}) => <InputStruct element={element} path={path} />


// Input : SecuredText field
export const SecuredText: InputStruct__props
  = ({element, path}) => <InputStruct element={element} path={path} />


// Input : Range field
export const Range: InputStruct__props
  = ({element, path}) => <InputStruct element={element} path={path} />

