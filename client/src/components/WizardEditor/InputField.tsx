// All Input types components, exported seperately
import React from 'react'
// Assets:
import Add from '../../assets/wizard-controllers/add-white.png'
import Required from '../../assets/Q-controllers/password-grey.png'
import Remove from '../../assets/Q-controllers/no-grey.png'
import Options from '../../assets/Q-controllers/options.png'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
// styles:
import Styles from '../../styles/components/WizardEditor/WizardInput.module.css'
import { getStyles } from '../../controllers'
// Types:
import { InputTypes, ValidInputType } from '../../interfaces/WizardFormat'
import { RootState } from '../../redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
import { AddElementAction, ElementTypes, QuestionTypes, WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'
import { AddElement, RemoveElement } from '../../redux/action-creators/WizardEditor'


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
export const AddHere: React.FC<{
  path: path_type, 
  lastOne?: boolean,
  noElements?: boolean
}> = ({path, lastOne, noElements}) => {

  const dispatch = useDispatch()
  // Dispatch Actions
  const addHereHandler = (lastAddHere?: boolean) => dispatch<AddElementAction>(
    AddElement(ElementTypes.QUESTION, {
      ...path,
      question: path.question + (lastAddHere ? 1 : 0)
    })
  )

  const AddHereSection: React.FC<{
    isLastElement?: boolean,
    isEmptySection?: boolean
  }> = ({isLastElement, isEmptySection}) => 
    <div className={getStyles(Styles, `Add-Here ${isLastElement
      ? "last-element"
      : ""} 
      ${isEmptySection
      ? "no-elements"
      : ""}`)}>
      <section onClick={()=>addHereHandler(isLastElement)}>
        <img src={Add} alt="Add Here" title='Add Here' />
      </section>
    </div>

  return (
    <>
      <AddHereSection isEmptySection={noElements} />
      { lastOne && <AddHereSection isLastElement /> }
    </>
  )
}


export type path_type = {
  page: number,
  section: number,
  question: number
}
// Input Struct : Text, SecuredInput, Textarea, etc..
type InputStruct__props = React.FC<{
  element: ValidInputType,
  path: path_type
}>
export const InputStruct: InputStruct__props = ({element, path}) => {

  // States:
  const { ActionType, ActionTrigger, Page } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  const IsLastElement = Page && Page[path.section]
    ?.elements[Page[path.section]?.elements.length - 1]?.name === element.name

  // Handlers:
  const dispatch = useDispatch()
  const removeHandler = () => dispatch(
    RemoveElement(ElementTypes.QUESTION, path)
  )

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
          <img src={Remove} alt="Remove" title='Remove Question' 
            onClick={removeHandler} />
          <img src={Options} alt="Options" title='Options' />
        </section>
      </div>
      { element.type !== 'Label'
        ? <h1 className={Styles["Input-type-placeholder"]}>{element.type}</h1>
        : ''}
      {/* Add element here */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && <AddHere path={path} />}
      {/* Add element here (last element identifier) */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && IsLastElement 
        && <AddHere path={path} lastOne={IsLastElement} />
      }
    </div>
  )
}
