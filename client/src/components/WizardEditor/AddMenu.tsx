// Menu for adding different comoponents in wizard editor
import React, { useState } from 'react'
// Assets:
import NewPage from '../../assets/wizard-controllers/new_page.png'
import NewElement from '../../assets/wizard-controllers/add-white.png'
// Styles:
import Styles from '../../styles/components/WizardEditor/AddMenu.module.css'
import { getStyles } from '../../controllers'


const AddMenu: React.FC = () => {

  // States:
  const [ElementsListState, setElementsListState] = useState(false)


  // Elements list
  const ElementsList: React.FC = () => {
    return (
      <ul className={Styles["ElementsList"]}>
        <li>Label</li>
        <li>Textbox</li>
        <li>Checkbox</li>
        <li>Image</li>
        <li>Textarea</li>
        <li>Secured Input</li>
      </ul>
    )
  }

  return (
    <div className={getStyles(Styles, `AddMenu ${ElementsListState?'show-elements-list':''}`)}>
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
