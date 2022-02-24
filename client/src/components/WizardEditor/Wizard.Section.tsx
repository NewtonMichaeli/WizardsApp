import React from 'react'
// Assets:
import Add from '../../assets/wizard-controllers/add-white.png'
import Delete from '../../assets/Q-controllers/no-grey.png'
// Redux:
import { useDispatch, useSelector } from 'react-redux'
// Types:
import { RootState } from '../../redux'
import { WizardSectionFormat } from '../../interfaces/WizardFormat'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
import { ElementTypes } from '../../redux/types'
import { ModifySectionAction, RemoveElementAction, WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'
import { AddElementAction } from '../../redux/action-types/WizardEditor'
import { AddElement, ModifyElement, RemoveElement } from '../../redux/actions/WizardEditor'
// Styles:
import Styles from '../../styles/components/WizardEditor/Wizard.Section.module.css'
import { getStyles } from '../../controllers'
// Utils:
import ParseElement from '../../utils/WizardEditor/ParseElement'
import { AddInputHere } from './Wizard.Input'


// Add Section in a certain index (path)
export const AddSectionHere: React.FC<{
  path: section_path_type,
  lastOne?: boolean,
  noElements?: boolean
}> = ({path, lastOne, noElements}) => {

  const dispatch = useDispatch()
  // Dispatch Actions
  const addHereHandler = (lastAddHere?: boolean) => dispatch<AddElementAction>(
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
  // Handlers
  const deleteSectionHandler = () => dispatch<RemoveElementAction>(
    RemoveElement.Section(path)
  )
  // Modifying Handlers
  const modifySectionName = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch<ModifySectionAction>(
      ModifyElement.Section(
        {page: page_idx, section: section_idx},
        e.target.value
      )
    )


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
            onChange={modifySectionName} />
        </h3>
      </section>
      {/* right section - info */}
      <section className={Styles["info-section"]}>
        {section.elements.map((element, i) => 
          <ParseElement 
            key={element.name}
            page={page_idx}
            section={section_idx}
            question={i}
            element={element} />
        )}
        {/* Add question here (if 0 questions exist) */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.QUESTION 
          && !section.elements.length
          && <AddInputHere path={{...path, question: 0}} noElements />}
        {/* Add section here */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.SECTION 
          && <AddSectionHere path={path} />}
        {/* Add section here (last element identifier) */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.SECTION 
          && IsLastElement 
          && <AddSectionHere path={path} lastOne />
        }
        {/* remove section */}
        { !IsAction &&
          <button className={Styles["remove-section"]} onClick={deleteSectionHandler}>
            <img src={Delete} alt="Delete Section" title='Remove Section' />
          </button>}
      </section>
    </div>
  )
}

export default Section
