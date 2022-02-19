import React from 'react'
import { useSelector } from 'react-redux'
import { WizardSectionFormat } from '../../interfaces/WizardFormat'
import { RootState } from '../../redux'
import { ElementTypes, WizardEditorActionTypes } from '../../redux/action-types/WizardEditor'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
// Styles:
import Styles from '../../styles/components/WizardEditor/Wizard.Section.module.css'
import ParseElement from '../../utils/WizardEditor/ParseElement'
import { AddHere, path_type } from './InputField'
// Components:



type Section__props = React.FC<{
  section: WizardSectionFormat, 
  page_idx: number,
  section_idx: number
}>
const Section: Section__props = ({section, section_idx, page_idx}) => {

  // States:
  const { ActionTrigger, ActionType } = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)

  const path_for_empty_section: path_type = {
    page: page_idx,
    section: section_idx,
    question: 0
  }, isNotEmpty = section.elements?.length ? true : false

  return (
    <div className={Styles["Section-container"]}>
      {/* left section - title */}
      <section className={Styles["title-section"]}>
        <h3 className={Styles["title-section-title"]}>
          <input 
            key={section.name}
            type="text"
            defaultValue={section.name}
            placeholder="Enter Section Name" />
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
        {/* display whenno elements */}
        {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
          && ActionTrigger.Type === ElementTypes.QUESTION 
          && !isNotEmpty 
          && <AddHere path={path_for_empty_section} noElements />}
      </section>
    </div>
  )
}

export default Section
