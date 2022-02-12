import React from 'react'
import { ValidInputType, WizardSectionFormat } from '../../interfaces/WizardFormat'
// Styles:
import Styles from '../../styles/components/WizardStats/Wizard.Section.module.css'
import ParseElement from '../../utils/ParseElement'


const Section: React.FC<{section: WizardSectionFormat}> = ({section}) => {

  return (
    <div className={Styles["Section-container"]}>
      {/* left section - title */}
      <section className={Styles["title-section"]}>
        <h3 className={Styles["title-section-title"]}>
          {section.section_name}
        </h3>
      </section>
      {/* right section - info */}
      <section className={Styles["info-section"]}>

        {section.elements.map(element => 
          <ParseElement key={element.title} element={element} />
        )}
        
      </section>
    </div>
  )
}

export default Section
