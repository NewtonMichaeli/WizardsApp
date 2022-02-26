// Input controllers field

import { Dispatch, useState } from 'react'
// Assets:
import Add_img from '../../assets/wizard-controllers/add-white.png'
import Required_True_img from '../../assets/Q-controllers/required-true.png'
import Required_False_img from '../../assets/Q-controllers/required-false.png'
import Remove_img from '../../assets/Q-controllers/no-grey.png'
import Remove_list_img from '../../assets/Q-controllers/no-white.png'
import Options_img from '../../assets/Q-controllers/options.png'
// Redux:
import { useDispatch, useSelector } from "react-redux"
import { AddElementAction, WizardEditorActionTypes } from "../../redux/action-types/WizardEditor"
// Types:
import { input_path_type, InputChange, list_input_path_type, sub_input_path_type} from "./types"
import { AddElement } from "../../redux/actions/WizardEditor"
import { RootState } from '../../redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
import { ValidInputListType } from '../../interfaces/WizardFormat'
import { ElementTypes, QuestionTypes } from '../../redux/types'
// Styles:
import Q_Controllers_Styles from '../../styles/Utils/WizardEditor/Q-Controller.module.css'
import AddInputHere_Styles from '../../styles/Utils/WizardEditor/AddInputHere.module.css'
import { getStyles } from "../../controllers"


// Add Question in a certain index (path)
export const AddInputHere: React.FC<{
  path: input_path_type,
  lastOne?: boolean,
  noElements?: boolean
}> = ({path, lastOne, noElements}) => {

  // Dispatch
  const dispatch = useDispatch()
  // States
  const {ActionType, ActionTrigger, Page} = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  const IsLastElement = Page ? Page[path.section]?.elements.length === path.question + 1 : false
  // Handlers
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
    <div className={getStyles(AddInputHere_Styles, `Add-Input-Here ${isLastElement
      ? "last-element"
      : ""} 
      ${isEmptySection
      ? "no-elements"
      : ""}`)}>
      <section title='Add Here' onClick={()=>addHereHandler(isLastElement)}>
        <img src={Add_img} alt="Add Here" />
      </section>
    </div>

  return (
    <>
      {/* Add question here */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && <AddHereSection isEmptySection={noElements} />}

      {/* Add question here (last element identifier) */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && IsLastElement
        && <AddHereSection isLastElement />
      }
    </>
  )
}


// Add List in a certain index (path)
export const AddListHere: React.FC<{
  path: list_input_path_type,
  noElements?: boolean,
  isInsideList?: true
}> = ({path, noElements, isInsideList}) => {

  // Dispatch
  const dispatch = useDispatch()
  // States
  const {ActionType, ActionTrigger, Page} = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  // Prevent inserting a lists-list element into a list element
  const Prevent_Inserting_ListsList_Into_List = (ActionTrigger.QuestionType !== QuestionTypes.LISTS_LIST
    || ActionTrigger.QuestionType === QuestionTypes.LISTS_LIST && path.option === undefined)
  // Is Last Element
  let IsLastElement = false
  if (Page) {
    const CurrentList = Page[path.section]?.elements[path.question] as ValidInputListType
    if (path.option !== undefined)    // list exists inside a list
      IsLastElement = CurrentList.elements.length === path.option + 1
    else
      IsLastElement = Page[path.section].elements.length === path.question + 1
  }
  // Handlers
  const addHereHandler = (lastAddHere?: boolean) => dispatch<AddElementAction>(
    AddElement.QuestionList({
      ...path,
      question: path.option
        ? path.question
        : path.question + (lastAddHere ? 1 : 0),
      option: path.option !== undefined
        ? path.option + (lastAddHere ? 1 : 0) 
        : path.option
    })
  )

  const AddHereSection: React.FC<{
    isLastElement?: boolean,
    isEmptySection?: boolean
  }> = ({isLastElement, isEmptySection}) => 
    <div className={getStyles(AddInputHere_Styles, `Add-Input-Here Input-List ${isLastElement
      ? "last-element"
      : ""} 
      ${isEmptySection
      ? "no-elements"
      : ""} 
      ${isEmptySection && isInsideList
      ? "no-elements-in-list"
      : ""}`)}>
      <section title='Add Here' onClick={()=>addHereHandler(isLastElement)}>
        <img src={Add_img} alt="Add Here" />
      </section>
    </div>

  return (
    <>
      {/* Add question-list here */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION_LIST 
        && Prevent_Inserting_ListsList_Into_List
        && <AddHereSection isEmptySection={noElements} />}

      {/* Add question-list here (last element identifier) */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION_LIST 
        && Prevent_Inserting_ListsList_Into_List
        && IsLastElement
        && <AddHereSection isLastElement />
      }
    </>
  )
}


// Add List in a certain index (path)
export const AddSubInputHere: React.FC<{
  path: sub_input_path_type,
  isInsideList?: boolean,
  noElements?: boolean
  list_type: QuestionTypes.CHECKBOX | QuestionTypes.RADIOBOX
}> = ({path, noElements, list_type}) => {

  // Dispatch
  const dispatch = useDispatch<Dispatch<AddElementAction>>()
  // States
  const {ActionType, ActionTrigger, Page} = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  let IsLastElement = false
  if (Page) {
    const CurrentList = Page[path.section].elements[path.question] as ValidInputListType
    // Check if question is inside a single or a nested list:
    if (path.list !== undefined && CurrentList.type === QuestionTypes.LISTS_LIST)
      IsLastElement = CurrentList.elements[path.list].elements.length === path.option + 1
    else
      IsLastElement = CurrentList.elements.length === path.option + 1
  }
  // Handlers
  const addHereHandler = (lastAddHere?: boolean) => dispatch(
    AddElement.SubQuestion({
      ...path,
      question: path.question,
      list: path.list,
      option: path.option + (lastAddHere ? 1 : 0)
    })
  )

  const AddHereSection: React.FC<{
    isLastElement?: boolean,
    isEmptySection?: boolean
  }> = ({isLastElement, isEmptySection}) => 
    <div className={getStyles(AddInputHere_Styles, `Add-Input-Here Sub-Input ${isLastElement
      ? "last-element"
      : ""} 
      ${isEmptySection
      ? "no-elements"
      : ""}`)}>
      <section title='Add Here' onClick={()=>addHereHandler(isLastElement)}>
        <img src={Add_img} alt="Add Here" />
      </section>
    </div>

  return (
    <>
      {/* Add question here */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.SUB_QUESTION 
        && ActionTrigger.QuestionType === list_type
        && <AddHereSection isEmptySection={noElements} />}

      {/* Add question here (last element identifier) */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.SUB_QUESTION 
        && ActionTrigger.QuestionType === list_type
        && IsLastElement
        && <AddHereSection isLastElement />
      }
    </>
  )
}


// Controllers


// Required Button controller
export const RequiredBtn: React.FC<{
  onClick: () => any,
  isRequired: boolean
}> = ({onClick, isRequired: InitLockState}) => {

  // States
  const [Lock, toggleLock] = useState(InitLockState)
  // Handlers
  const ToggleLock = () => {
    toggleLock(!Lock)
    onClick()
  }
  return <button className={Q_Controllers_Styles["Q-controllers-btn"]} onClick={ToggleLock}>
    <img src={Lock ? Required_True_img : Required_False_img} alt="Required" title='Set to Required' />
  </button>
}
  

// Delete Question controller
export const DeleteInputBtn: React.FC<{
  onClick: () => any,
  isDeleteList?: true
}> = ({onClick, isDeleteList}) =>
  <button className={getStyles(Q_Controllers_Styles, `Q-controllers-btn ${isDeleteList
    ? 'delete-list'
    : ''}`)} onClick={onClick}>
    <img src={isDeleteList 
      ? Remove_list_img 
      : Remove_img} alt="Delete" title={isDeleteList 
        ? 'Delete List'
        : 'Delete Question'} />
  </button>
  

// Options Button controller
export const OptionsBtn: React.FC<{
  min?: {
    initValue: number,
    onClick: (min: number) => any
  },
  max?: {
    initValue: number,
    onClick: (max: number) => any
  },
  regex?: {
    initValue: RegExp | null,
    onClick: (regex: RegExp | null) => any
  },
  url?: {
    initValue: string,
    onClick: (url: string) => any
  }
}> = ({min, max, regex, url}) => {

  // States
  const [Options, toggleOptions] = useState(false)
  
  return <button className={getStyles(Q_Controllers_Styles, `Q-controllers-btn options`)}>
    <span onClick={()=>toggleOptions(!Options)}> {/* click area */} </span>
    <img src={Options_img} alt="Options" title='Options' />
    {/* inner options container */}
    <div className={getStyles(Q_Controllers_Styles, `options-container ${Options
      ? 'open'
      : ''}`)}>
      {/* min value */}
      { Options && min && <input type="number" title='Min' placeholder='Min value:' 
        defaultValue={min.initValue}
        onChange={(e: InputChange) => min.onClick(parseInt(e.target.value) ?? 3)} /> }
      {/* max value */}
      { Options && max && <input type="number" title='Max' placeholder='Max value:' 
        defaultValue={max.initValue}
        onChange={(e: InputChange) => max.onClick(parseInt(e.target.value)) ?? 24} /> }
      {/* regex value */}
      { Options && regex && <input type="text" title='Regex' placeholder='Regex:' 
        defaultValue={regex.initValue ? regex.initValue.toString() : ''}
        onChange={(e: InputChange) => regex.onClick(RegExp(e.target.value))} /> }
      {/* url value */}
      { Options && url && <input type="url" title='Image Url' placeholder='Image Url:' 
        defaultValue={url.initValue}
        onChange={(e: InputChange) => url.onClick(e.target.value)} /> }
    
    </div>
  </button>
}
