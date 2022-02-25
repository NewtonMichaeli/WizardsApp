// Menu for adding different comoponents in wizard editor
import React, { Dispatch, useState } from 'react'
// Assets:
import NewPage from '../../assets/wizard-controllers/new_page.png'
import NewElement from '../../assets/wizard-controllers/add-white.png'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
// Types:
import { ElementTypes, QuestionTypes } from '../../redux/types'
import { WizardEditorAction, WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'
import { AddingElementMode } from '../../redux/actions/WizardEditor'
import { RootState } from '../../redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
// Styles:
import Styles from '../../styles/components/WizardEditor/AddMenu.module.css'
import { getStyles } from '../../controllers'


const AddMenu: React.FC = () => {

  // Store:
  const { ActionType, Page, WizardState } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  // States:
  const [ElementsListState, setElementsListState] = useState(false)
  const isZeroPages = WizardState?.pages.length ? false : true
  const isZeroSections = Page?.length ? false : true
  // Dispatch:
  const dispatch = useDispatch<Dispatch<WizardEditorAction>>()
  // Handlers
  // dispatch type:ADDING_ELEMENT_MODE:PAGE
  const AddingPageMode = () =>
    !isZeroPages && dispatch(AddingElementMode(ElementTypes.PAGE))
  // dispatch type:ADDING_ELEMENT_MODE:SECTION
  const AddingSectionMode = () => 
    !isZeroSections && dispatch(AddingElementMode(ElementTypes.SECTION))
  // dispatch type:ADDING_ELEMENT_MODE:INPUT
  const AddingInputMode = (question_type: QuestionTypes) => dispatch(AddingElementMode(ElementTypes.QUESTION, question_type))
  // dispatch type:ADDING_ELEMENT_MODE:INPUT_LIST
  const AddingListMode = (question_type: QuestionTypes) => dispatch(AddingElementMode(ElementTypes.QUESTION_LIST, question_type))
  // dispatch type:ADDING_ELEMENT_MODE:SUB_INPUT
  const AddingSubInputMode = (question_type: QuestionTypes) => dispatch(AddingElementMode(ElementTypes.SUB_QUESTION, question_type))

  // Elements list
  const ElementsList: React.FC = () => {
    return (
      <ul className={Styles["ElementsList"]}>
        <li onClick={()=>AddingSubInputMode(QuestionTypes.CHECKBOX)}>Checkbox</li>
        <li onClick={()=>AddingListMode(QuestionTypes.CHECKBOX_LIST)}>Checkbox List</li>
        <li onClick={()=>AddingSubInputMode(QuestionTypes.IMAGE)}>Image</li>
        <li onClick={()=>AddingSubInputMode(QuestionTypes.IMAGE)}>Image List</li>
        <li onClick={()=>AddingInputMode(QuestionTypes.LABEL)}>Label</li>
        <li onClick={()=>AddingListMode(QuestionTypes.LISTS_LIST)}>Lists List</li>
        <li onClick={()=>AddingSubInputMode(QuestionTypes.RADIOBOX)}>RadioBox</li>
        <li onClick={()=>AddingListMode(QuestionTypes.RADIOBOX_LIST)}>Radiobox List</li>
        <li onClick={()=>AddingInputMode(QuestionTypes.RANGE)}>Range</li>
        <li onClick={()=>AddingInputMode(QuestionTypes.SECURED_INPUT)}>Secured Input</li>
        <li onClick={()=>AddingInputMode(QuestionTypes.TEXTAREA)}>Text</li>
        <li onClick={()=>AddingInputMode(QuestionTypes.TEXTAREA)}>Textarea</li>
        <li onClick={()=>AddingInputMode(QuestionTypes.TEXT)}>Textbox</li>
      </ul>
    )
  }

  return (
    <div className={getStyles(Styles, `AddMenu ${ElementsListState && !isZeroSections
      ? 'show-elements-list'
      : ''} ${ActionType === WizardEditorActionTypes.ADDING_ELEMENT
      ? 'adding-mode-active'
      : ''}`)}>
      {/* add new page */}
      <button className={getStyles(Styles, `prim-add-btn ${isZeroPages
        ? "add-disabled"
        : ""}`)} onClick={AddingPageMode}>
        <img src={NewPage} alt="New Page" title='New Page' />
        <span>New Page</span>
      </button>
      {/* add new section */}
      <button className={getStyles(Styles, `prim-add-btn ${isZeroSections
        ? "add-disabled"
        : ""}`)} onClick={AddingSectionMode}>
        <img src={NewPage} alt="New Section" title='New Section' />
        <span>New Section</span>
      </button>
      {/* add new element (from list) */}
      <button onClick={() => setElementsListState(s=> !s && !isZeroSections)}
        className={getStyles(Styles, `prim-add-btn ${isZeroSections
          ? "add-disabled"
          : ""}`)} >
        <img src={NewElement} alt="New Element" title='New Element' />
        <span>New Element</span>
      </button>
      {/* add new element - list */}
      {ElementsListState && <ElementsList /> }
    </div>
  )
}

export default AddMenu
