// Menu for adding different comoponents in wizard editor
import React, { Dispatch, useState } from 'react'
// Assets:
import NewPage from '../../assets/wizard-controllers/new_page.png'
import NewElement from '../../assets/wizard-controllers/add-white.png'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
// Styles:
import Styles from '../../styles/components/WizardEditor/AddMenu.module.css'
import { getStyles } from '../../controllers'
import { ElementTypes, QuestionTypes, WizardEditorAction, WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'
import { AddingElementMode } from '../../redux/action-creators/WizardEditor'
import { RootState } from '../../redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'


const AddMenu: React.FC = () => {

  // States:
  const [ElementsListState, setElementsListState] = useState(false)
  // Store:
  const { ActionType } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  // Dispatch:
  const dispatch = useDispatch<Dispatch<WizardEditorAction>>()
  const AddingMode = (question_type: QuestionTypes) => dispatch(
    AddingElementMode(ElementTypes.QUESTION, question_type)
  )

  // Elements list
  const ElementsList: React.FC = () => {
    return (
      <ul className={Styles["ElementsList"]}>
        <li onClick={()=>AddingMode(QuestionTypes.LABEL)}>Label</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXT)}>Textbox</li>
        <li onClick={()=>AddingMode(QuestionTypes.CHECKBOX)}>Checkbox</li>
        <li onClick={()=>AddingMode(QuestionTypes.IMAGE)}>Image</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXTAREA)}>Textarea</li>
        <li onClick={()=>AddingMode(QuestionTypes.SECURED_INPUT)}>Secured Input</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXTAREA)}>Textarea</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXTAREA)}>Radiobox List</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXTAREA)}>Checkbox List</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXTAREA)}>Lists List</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXTAREA)}>Range</li>
        <li onClick={()=>AddingMode(QuestionTypes.TEXTAREA)}>RadioBox</li>
      </ul>
    )
  }

  return (
    <div className={getStyles(Styles, `AddMenu ${ElementsListState
      ? 'show-elements-list'
      : ''} ${ActionType === WizardEditorActionTypes.ADDING_ELEMENT
      ? 'adding-mode-active'
      : ''}`)}>
      {/* add new page */}
      <button className={Styles['prim-add-btn']}>
        <img src={NewPage} alt="New Page" title='New Page' />
        <span>New Page</span>
      </button>
      {/* add new section */}
      <button className={Styles['prim-add-btn']}>
        <img src={NewPage} alt="New Section" title='New Section' />
        <span>New Section</span>
      </button>
      {/* add new element (from list) */}
      <button className={Styles['prim-add-btn']} onClick={() => setElementsListState(s=>!s)}>
        <img src={NewElement} alt="New Element" title='New Element' />
        <span>New Element</span>
      </button>
      {/* add new element - list */}
      {ElementsListState && <ElementsList /> }
    </div>
  )
}

export default AddMenu
