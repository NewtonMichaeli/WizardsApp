import React, { Dispatch } from 'react'
// Assets:
import Add from '../../assets/wizard-controllers/add-white.png'
import Delete from '../../assets/Q-controllers/no-grey.png'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
// Types:
import { RootState } from '../../redux'
import { ValidInputListType, ValidInputType, ValidSubInputType, WizardSectionFormat } from '../../interfaces/WizardFormat'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
import { ElementTypes } from '../../redux/types'
import { WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'
import { InputChange, input_path_type, list_input_path_type, sub_input_path_type } from '../../utils/WizardEditor/types'
import { AddElementAction } from '../../redux/action-types/WizardEditor'
// Styles:
import Styles from '../../styles/components/WizardEditor/Wizard.Section.module.css'
import { getStyles } from '../../controllers'
// Utils:
import { AddElement, ModifyElement, RemoveElement } from '../../redux/actions/WizardEditor'
import ParseElement from '../../utils/WizardEditor/ParseElement'
import { AddInputHere, AddListHere } from '../../utils/WizardEditor/InputUtils'


// Add Section in a certain index (path)
export const AddSectionHere: React.FC<{
  path: section_path_type,
  lastOne?: boolean,
  noElements?: boolean
}> = ({path, lastOne, noElements}) => {

  const dispatch = useDispatch<Dispatch<AddElementAction>>()
  // Dispatch Actions
  const addHereHandler = (lastAddHere?: boolean) => dispatch(
    AddElement.Section({
      ...path,
      section: path.section + (lastAddHere ? 1 : 0)
    })
  )

  const AddHereSection: React.FC<{
    isLastElement?: boolean,
    isEmptySection?: boolean
  }> = ({isLastElement, isEmptySection}) => 
    <div className={getStyles(Styles, `Add-Section-Here ${isLastElement
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


// Section struct type
export type section_path_type = {
  page: number,
  section: number
}
// Section Struct
const Section: React.FC<{
  section: WizardSectionFormat, 
  page_idx: number,
  section_idx: number
}> = ({section, section_idx, page_idx}) => {

  // States
  const { IsAction, ActionTrigger, ActionType, WizardState } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  // Section path
  const path: section_path_type = {
    page: page_idx,
    section: section_idx
  }, IsLastElement = section_idx + 1 === WizardState?.pages[page_idx].length
  
  // Dispatch
  const dispatch = useDispatch()

  return (
    <div className={Styles["Section-container"]}>
      {/* left section - title */}
      <section className={Styles["title-section"]}>
        <h3 className={Styles["title-section-title"]}>
          <input 
            key={section.name}
            type="text"
            defaultValue={section.name}
            placeholder="Enter Section Name"
            onChange={(e: InputChange) => dispatch(ModifyElement.Section(path, e.target.value))} />
        </h3>
      </section>
      {/* right section - info */}
      <section className={Styles["info-section"]}>
        {/* input parser */}
        {section.elements.map((element, i) => 
          <ParseElement 
            key={element.name}
            page={page_idx}
            section={section_idx}
            question={i}
            element={element} />  // passing object reference - can be changed in question
        )}

        {/* Add question here (if 0 questions exist) */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.QUESTION 
          && !section.elements.length
          && <AddInputHere path={{...path, question: 0}} noElements />}

        {/* Add question-list here (if 0 question-lists exist) */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.QUESTION_LIST
          && !section.elements.length
          && <AddListHere path={{...path, question: 0}} noElements />}

        {/* Add section here */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.SECTION 
          && <AddSectionHere path={path} />}

        {/* Add section here (last element identifier) */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.SECTION 
          && IsLastElement 
          && <AddSectionHere path={path} lastOne />}

        {/* remove section */}
        { !IsAction &&
          <button className={Styles["remove-section"]} onClick={() => dispatch(RemoveElement.Section(path))}>
            <img src={Delete} alt="Delete Section" title='Remove Section' />
          </button>}
      </section>
    </div>
  )
}

export default Section
