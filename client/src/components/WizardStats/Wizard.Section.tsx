import React from 'react'
import { ValidInputType, WizardSectionFormat } from '../../interfaces/WizardFormat'
import { WizardServerFormSectionFormat } from '../../interfaces/WizardFormat_Server'
// Styles:
import Styles from '../../styles/components/WizardStats/Wizard.Section.module.css'
import ParseElement from '../../utils/WizardStats/ParseElement'


type Section__props = React.FC<{
  section: WizardSectionFormat,
  section_idx: number
}>
const Section: Section__props = ({section, section_idx}) => {

  return (
    <div className={Styles["Section-container"]}>
      {/* left section - title */}
      <section className={Styles["title-section"]}>
        <h4 className={Styles["title-section-title"]}>
          {section.name}
        </h4>
      </section>
      {/* right section - info */}
      <section className={Styles["info-section"]}>

        {section.elements.map((element, i) => 
          <ParseElement key={i} q_idx={i} element={element} />)}
        
      </section>
    </div>
  )
}

export default Section
