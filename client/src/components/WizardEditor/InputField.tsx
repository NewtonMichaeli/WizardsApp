// All Input types components, exported seperately
import React from 'react'
// Assets:
import Required from '../../assets/Q-controllers/password-grey.png'
import Remove from '../../assets/Q-controllers/no-grey.png'
import Options from '../../assets/Q-controllers/options.png'
// Redux:
import { useSelector } from 'react-redux'
// styles:
import Styles from '../../styles/components/WizardEditor/WizardInput.module.css'
// Types:
import { ValidInputType } from '../../interfaces/WizardFormat'
import { RootState } from '../../redux'


// Input controllers field
type InputControllers__props = React.FC<{
  children: JSX.Element | string
}>
const InputControllers: InputControllers__props = ({children}) => {
  return (
    <section className={Styles["question-controllers"]}>
      <img src={Required} alt="Required" title='Set to Required' />
      <img src={Remove} alt="Remove" title='Remove Question' />
      <img src={Options} alt="Options" title='Options' />
    </section>
  )
}


// Input Struct : Text, SecuredInput, Textarea, etc..
type InputStruct__props = React.FC<{
  element: ValidInputType
}>
export const InputStruct: InputStruct__props = ({element}) => {

  // States:
  // const Wizard = useSelector<RootState>()

  return (
    <div className={Styles["Wizard-Input"]}>
      <div className={Styles["upper-section"]}>
        <input
          type="text"
          id={element.name}
          name={element.name} 
          itemID={element.name}
          placeholder={`Enter ${element.type} Title`}
          />
        <section className={Styles["question-controllers"]}>
          <img src={Required} alt="Required" title='Set to Required' />
          <img src={Remove} alt="Remove" title='Remove Question' />
          <img src={Options} alt="Options" title='Options' />
        </section>
      </div>
      { element.type !== 'Label'
        ? <h1 className={Styles["Input-type-placeholder"]}>{element.type}</h1>
        : ''}
    </div>
  )
}



// Input : Label field
export const Label: React.FC<{element: ValidInputType}>
  = ({element}) => <InputStruct element={element} />


// Input : Text field
export const Text: React.FC<{element: ValidInputType}>
  = ({element}) => <InputStruct element={element} />


// Input : Text field
export const Textarea: React.FC<{element: ValidInputType}>
  = ({element}) => <InputStruct element={element} />


// Input : SecuredText field
export const SecuredText: React.FC<{element: ValidInputType}>
  = ({element}) => <InputStruct element={element} />


// Input : Range field
export const Range: React.FC<{element: ValidInputType}>
  = ({element}) => <InputStruct element={element} />

