import React from 'react'
// Redux:
import { useSelector } from 'react-redux'
// Types:
import { RootState } from '../../redux'
import { WizardSectionFormat } from '../../interfaces/WizardFormat'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
// Styles:
import Styles from '../../styles/components/WizardEditor/Wizard.Section.module.css'
import { getStyles } from '../../controllers'
// Utils:
import ParseElement from '../../utils/WizardForm/ParseElement'
import { WizardFormSectionFormat } from '../../interfaces/WizardFormat_Form'


// Section struct type
export type section_path_type = {
  page: number,
  section: number
}
// Section Struct
const Section: React.FC<{
  section: WizardFormSectionFormat
}> = ({section}) => {

  return (
    <div className={Styles["Section-container"]}>
      {/* left section - title */}
      <section className={Styles["title-section"]}>
        <h3 className={Styles["title-section-title"]}>
          {section.name}
        </h3>
      </section>
      {/* right section - info */}
      <section className={Styles["info-section"]}>
        
        {/* input parser */}
        {section.elements.map((element, i) => 
          <ParseElement 
            key={element.name}
            element={element} />  // passing object reference - can be changed in question
        )}

      </section>
    </div>
  )
}

export default Section
