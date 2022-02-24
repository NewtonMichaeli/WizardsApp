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
import { getStyles } from '../../controllers'
// Types:
import { ValidInputType } from '../../interfaces/WizardFormat'
import { RootState } from '../../redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
import { ElementTypes } from '../../redux/types'
import { AddElementAction, ModifyElementAction, RemoveElementAction, WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'
import { AddElement, ModifyElement, RemoveElement } from '../../redux/actions/WizardEditor'


// Input controllers field
const InputControllers: React.FC<{
  children: JSX.Element | string
}> = ({children}) => {
  return (
    <section className={Styles["question-controllers"]}>
      <img src={Required} alt="Required" title='Set to Required' />
      <img src={Remove} alt="Remove" title='Remove Question' />
      <img src={Options} alt="Options" title='Options' />
    </section>
  )
}


// Add Question in a certain index (path)
export const AddInputHere: React.FC<{
  path: input_path_type, 
  lastOne?: boolean,
  noElements?: boolean
}> = ({path, lastOne, noElements}) => {

  const dispatch = useDispatch()
  // Dispatch Actions
  const addHereHandler = (lastAddHere?: boolean) => dispatch<AddElementAction>(
    AddElement.Question({
      ...path,
      question: path.question + (lastAddHere ? 1 : 0)
    })
  )

  const AddHereSection: React.FC<{
    isLastElement?: boolean,
    isEmptySection?: boolean
  }> = ({isLastElement, isEmptySection}) => 
    <div className={getStyles(Styles, `Add-Input-Here ${isLastElement
      ? "last-element"
      : ""} 
      ${isEmptySection
      ? "no-elements"
      : ""}`)}>
      <section title='Add Here' onClick={()=>addHereHandler(isLastElement)}>
        <img src={Add} alt="Add Here" />
      </section>
    </div>

  return (
    <>
      <AddHereSection isEmptySection={noElements} />
      { lastOne && <AddHereSection isLastElement /> }
    </>
  )
}


export type input_path_type = {
  page: number,
  section: number,
  question: number
}
// Input Struct : Text, SecuredInput, Textarea, etc..
type InputStruct__props = React.FC<{
  element: ValidInputType,
  path: input_path_type
}>
export const InputStruct: InputStruct__props = ({element, path}) => {

  // States:
  const { ActionType, ActionTrigger, Page } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  const IsLastElement = Page && Page[path.section]
    ?.elements[Page[path.section]?.elements.length - 1]?.name === element.name

  // Dispatch
  const dispatch_modify = useDispatch<Dispatch<ModifyElementAction>>()
  const dispatch_remove = useDispatch<Dispatch<RemoveElementAction>>()
  // Handlers:
  const removeInputHandler = () => dispatch_remove(RemoveElement.Question(path))

  // Modifying handlers Object
  const Modify = {
    Title: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch_modify(ModifyElement.Question(path, {type: element.type, title: e.target.value})),
    Require: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch_modify(ModifyElement.Question(path, {
        type: element.type,
        
      })),
  }

  return (
    <div className={Styles["Wizard-Input"]}>
      <div className={Styles["upper-section"]}>
        <input
          type="text"
          id={element.name}
          name={element.name} 
          itemID={element.name}
          placeholder={`Enter ${element.type} Title`}
          defaultValue={element.title}
          onChange={Modify.Title}
          />
        <section className={Styles["question-controllers"]}>
          <img src={Required} alt="Required" title='Set to Required' />
          <img src={Remove} alt="Remove" title='Remove Question' 
            onClick={removeInputHandler} />
          <img src={Options} alt="Options" title='Options' />
        </section>
      </div>

      {/* Input type placeholder (except label) */}
      { element.type !== 'Label'
        ? <h1 className={Styles["Input-type-placeholder"]}>{element.type}</h1>
        : ''}

      {/* Add question here */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && <AddInputHere path={path} />}

      {/* Add question here (last element identifier) */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && IsLastElement 
        && <AddInputHere path={path} lastOne={IsLastElement} />
      }

    </div>
  )
}
