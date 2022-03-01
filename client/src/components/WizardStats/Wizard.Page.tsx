// Wizard : Page component

import React from "react"
// Types:
import { WizardPageFormat } from "../../interfaces/WizardFormat"
// Styles:
import Styles from '../../styles/components/WizardStats/Wizard.Page.module.css'
import Section from "./Wizard.Section"


const PageComponent: React.FC<{page: WizardPageFormat, page_idx: number}> = ({page, page_idx}) => {

  return (
    <div className={Styles["stats-PageComponent"]}>
      {/* page idx top section */}
      <div className={Styles["page-seperator-section"]}>
        <h5>Page {page_idx + 1}</h5>
      </div>
      {/* page content */}
      <div className={Styles["page-stats-content"]}>

        {page.map((section, i) => 
          <Section key={i} section_idx={i} section={section} />)}

      </div>
    </div>
  )
}

export default PageComponent