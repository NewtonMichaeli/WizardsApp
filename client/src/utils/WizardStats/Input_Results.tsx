// Inputs (RESULTS mode)

import { useDispatch, useSelector } from "react-redux"
// Types:
import { InputChange, TextareaChange } from "../WizardEditor/types"
import { InputTypes } from "../../interfaces/WizardFormat"
import { QuestionTypes } from "../../redux/types"
import { RootState } from "../../redux"
import { wizard_stats_state_type } from "../../redux/types/reducerStateTypes"
import { ServerFormInputTypes } from "../../interfaces/WizardFormat_Server"
// Assets:
import noimg from '../../assets/Q-controllers/noimg.png'
// Styles:
import Styles from '../../styles/Utils/WizardStats/Input_Results.module.css'
import { getStyles } from "../../controllers"


export const Label: React.FC<{
  question: InputTypes['Label']
}> = ({question}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Label")}>
      <h3>{question.title}</h3>
    </div>
  )
}


export const Text: React.FC<{
  question: InputTypes['Text']
}> = ({question}) => {

  // States
  const { AllAnswers, Username } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  let value: string = ''
  if (Username && AllAnswers) value = (AllAnswers[Username][question.name] as ServerFormInputTypes['Text'])?.value

  return (
    <div className={getStyles(Styles, "Input Input-Text")}>
      <h3>{question.title}</h3>
      <h4 className={getStyles(Styles, `user-answer ${value ?  "" : "no-answer"}`)}>{value}</h4>
    </div>
  )
}


export const Textarea: React.FC<{
  question: InputTypes['Textarea']
}> = ({question}) => {

  // States
  const { AllAnswers, Username } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  let value: string = ''
  if (Username && AllAnswers) value = (AllAnswers[Username][question.name] as ServerFormInputTypes['Textarea'])?.value

  return (
    <div className={getStyles(Styles, "Input Input-Textarea")}>
      <h3>{question.title}</h3>
      <h4 className={getStyles(Styles, `user-answer ${value ? "" : "no-answer"}`)}>{value}</h4>
    </div>
  )
}


export const SecuredInput: React.FC<{
  question: InputTypes['SecuredInput']
}> = ({question}) => {

  // States
  const { AllAnswers, Username } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  let value: string = ''
  if (Username && AllAnswers) value = (AllAnswers[Username][question.name] as ServerFormInputTypes['Text'])?.value
  
  return (
    <div className={getStyles(Styles, "Input Input-SecuredInput")}>
      <h3>{question.title}</h3>
      <h4 className={getStyles(Styles, `user-answer ${value ?  "" : "no-answer"}`)}>{value}</h4>
    </div>
  )
}


export const Checkbox: React.FC<{
  question: InputTypes['Checkbox'],
  name: string,
  isChecked: boolean
}> = ({question, name, isChecked}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Checkbox")}>
      <input type="checkbox" name={name} id={question.name} checked={isChecked} disabled />
      <label htmlFor={question.name}>{question.title}</label>
    </div>
  )
}


export const Image: React.FC<{
  question: InputTypes['Image'],
  name: string,
  isChecked: boolean
}> = ({question, name, isChecked}) => {

  // Handlers
  const imageNotFoundHandler = (e: EventTarget & HTMLImageElement) => {
    e.onerror = null
    e.src = noimg
  }

  return (
    <div className={getStyles(Styles, `Input Input-Partial Input-Image ${isChecked ? 'selected-image' : ''}`)}>
      <div className={Styles["option"]}>
        <img src={question.url} onError={({currentTarget}) => imageNotFoundHandler(currentTarget)} alt={question.title} />
      </div>
    </div>
  )
}


export const ImagesList: React.FC<{
  question: InputTypes['Image List']
}> = ({question}) => {

  // States
  const { AllAnswers, Username } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  let value: string | null = null
  if (Username && AllAnswers) value = (AllAnswers[Username][question.name] as ServerFormInputTypes['Image List'])?.checkedInput

  return (
    <div className={getStyles(Styles, "Input Input-List Input-ImageList")}>
      <h3>{question.title}</h3>
      <div className={Styles["data-section"]}>
        <div className={Styles["Input-container"]}>
          {question.elements.map((input, i) => 
            <Image key={input.name} 
              question={input}
              isChecked={value === input.name}
              name={question.name} />)}
        </div>
      </div>
    </div>
  )
}


export const RadioboxList: React.FC<{
  question: InputTypes['Radiobox List']
}> = ({question}) => {

  const { AllAnswers, Username } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  let value: string | null = null
  if (Username && AllAnswers) value = (AllAnswers[Username][question.name] as ServerFormInputTypes['Radiobox List'])?.checkedElement

  return (
    <div className={getStyles(Styles, "Input Input-List Input-RadioboxList")}>
      <h3>{question.title}</h3>
      <div className={Styles["data-section"]}>
        <div className={Styles["Input-container"]}>
          {question.elements.map((input, i) => 
            <Radiobox key={input.name} 
              question={input}
              isChecked={value === input.name}
              name={question.name} />)}
        </div>
      </div>
    </div>
  )
}


export const CheckboxList: React.FC<{
  question: InputTypes['Checkbox List']
}> = ({question}) => {

  const { AllAnswers, Username } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  let values: string[] = []
  if (Username && AllAnswers) values = (AllAnswers[Username][question.name] as ServerFormInputTypes['Checkbox List'])?.checkedElements

  return (
    <div className={getStyles(Styles, "Input Input-List Input-CheckboxList")}>
      <h3>{question.title}</h3>
      <div className={Styles["data-section"]}>
        <div className={Styles["Input-container"]}>
          {question.elements.map((input, i) => 
            <Checkbox key={input.name} 
              question={input} 
              isChecked={values.includes(input.name)}
              name={input.name} />)}
        </div>
      </div>
    </div>
  )
}


export const ListsList: React.FC<{
  question: InputTypes['Lists List']
}> = ({question}) => {

  return (
    <div className={getStyles(Styles, "Input Input-List Input-ListsList")}>
      <h3>{question.title}</h3>
      <div className={Styles["Lists-container"]}>
        {/* map through elements */}
        {question.elements.map((list, i) => {
          if (list.type === QuestionTypes.CHECKBOX_LIST)
            return <CheckboxList key={list.name} question={list} />
          else if (list.type === QuestionTypes.RADIOBOX_LIST) 
            return <RadioboxList key={list.name} question={list} />
        })}
      </div>
    </div>
  )
}


export const Radiobox: React.FC<{
  question: InputTypes['Radiobox']
  name: string,
  isChecked: boolean,
}> = ({question, name, isChecked}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Radiobox")}>
      <input type="radio" name={name} defaultChecked={isChecked} id={question.name} disabled />
      <label htmlFor={question.name}>{question.title}</label>
    </div>
  )
}


// LABEL
// TEXT
// TEXTAREA
// SECURED_INPUT
// CHECKBOX
// IMAGE
// RADIOBOX_LIST
// CHECKBOX_LIST
// LISTS_LIST
// RADIOBOX

