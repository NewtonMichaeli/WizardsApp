import React from 'react'
import { ValidInputType, WizardSectionFormat } from '../../interfaces/WizardFormat'
// Styles:
import Styles from '../../styles/components/WizardEditor/Wizard.Section.module.css'
import ParseElement from '../../utils/WizardEditor/ParseElement'


type Section__props = React.FC<{
  section: WizardSectionFormat, 
  page_idx: number,
  section_idx: number
}>
const Section: Section__props = ({section, section_idx, page_idx}) => {

  return (
    <div className={Styles["Section-container"]}>
      {/* left section - title */}
      <section className={Styles["title-section"]}>
        <h3 className={Styles["title-section-title"]}>
          <input 
            type="text" 
            defaultValue={section.name}
            placeholder="Enter Section Name" />
        </h3>
      </section>
      {/* right section - info */}
      <section className={Styles["info-section"]}>

        {section.elements.map((element, i) => 
          <ParseElement key={element.name}
            page_idx={page_idx}
            section_idx={section_idx}
            q_idx={i}
            element={element} />
        )}
        
      </section>
    </div>
  )
}

export default Section
