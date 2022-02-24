// Input controllers field

// Assets:
import Add from '../../assets/wizard-controllers/add-white.png'
import Required from '../../assets/Q-controllers/password-grey.png'
import Remove from '../../assets/Q-controllers/no-grey.png'
import Options from '../../assets/Q-controllers/options.png'
// Redux:
import { useDispatch, useSelector } from "react-redux"
import { AddElementAction, WizardEditorActionTypes } from "../../redux/action-types/WizardEditor"
// Types:
import { input_path_type } from "../../components/WizardEditor/Wizard.Input"
import { AddElement } from "../../redux/actions/WizardEditor"
import { RootState } from '../../redux'
import { wizard_editor_state_type } from '../../redux/types/reducerStateTypes'
import { ElementTypes } from '../../redux/types'
// Styles:
import Q_Controllers_Styles from '../../styles/Utils/WizardEditor/Q-Controller.module.css'
import AddInputHere_Styles from '../../styles/Utils/WizardEditor/AddInputHere.module.css'
import { getStyles } from "../../controllers"


// Add Question in a certain index (path)
export const AddInputHere: React.FC<{
  path: input_path_type,
  lastOne?: boolean,
  noElements?: boolean
}> = ({path, lastOne, noElements}) => {

  // Dispatch
  const dispatch = useDispatch()
  // States
  const {ActionType, ActionTrigger, Page} = useSelector<RootState, wizard_editor_state_type>(state => state.wizard_editor)
  const IsLastElement = Page ? Page[path.section]?.elements.length === path.question + 1 : false
  // Hamdlers
  const addHereHandler = (lastAddHere?: boolean) => dispatch<AddElementAction>(
    AddElement.Question({
      ...path,
      question: path.question + (lastAddHere ? 1 : 0)
    })
  )

  const AddHereSection: React.FC<{
    isLastElement?: boolean,
    isEmptySection?: boolean
  }> = ({isLastElement, isEmptySection}) => 
    <div className={getStyles(AddInputHere_Styles, `Add-Input-Here ${isLastElement
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
      {/* Add question here */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && <AddHereSection isEmptySection={noElements} />}

      {/* Add question here (last element identifier) */}
      {ActionType === WizardEditorActionTypes.ADDING_ELEMENT 
        && ActionTrigger.Type === ElementTypes.QUESTION 
        && IsLastElement
        && <AddHereSection isLastElement />
      }
    </>
  )
}


// Required Button controller
export const RequiredBtn: React.FC<{onClick: () => any}> = ({onClick}) =>
  <button className={Q_Controllers_Styles["Q-controllers-btn"]} onClick={onClick}>
    <img src={Required} alt="Required" title='Set to Required' />
  </button>
  

// Delete Question controller
export const DeleteInputBtn: React.FC<{onClick: () => any}> = ({onClick}) =>
  <button className={Q_Controllers_Styles["Q-controllers-btn"]} onClick={onClick}>
    <img src={Remove} alt="Delete" title='Delete Question' />
  </button>
  

// Options Button controller
export const OptionsBtn: React.FC<{onClick: () => any}> = ({onClick}) =>
  <button className={Q_Controllers_Styles["Q-controllers-btn"]} onClick={onClick}>
    <img src={Options} alt="Options" title='Options' />
  </button>

