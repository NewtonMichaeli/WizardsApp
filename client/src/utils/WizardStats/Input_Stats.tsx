// Inputs

import { useDispatch, useSelector } from "react-redux"
// Types:
import { InputChange, TextareaChange } from "../WizardEditor/types"
import { InputTypes } from "../../interfaces/WizardFormat"
import { QuestionTypes } from "../../redux/types"
import { RootState } from "../../redux"
import { wizard_stats_state_type } from "../../redux/types/reducerStateTypes"
// Components:
import { InStatisticableField } from "./InputUtils"
// Styles:
import Styles from '../../styles/Utils/WizardStats/Input_Stats.module.css'
import { getStyles } from "../../controllers"
import { ServerFormInputTypes } from "../../interfaces/WizardFormat_Server"


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
  const { AllAnswers } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)
  if (AllAnswers)
    Object.entries(AllAnswers).map((UserAnswer, i) => {
      console.log(i + " | " + question.title + " : ", UserAnswer[1][question.name])
    })

  return (
    <div className={getStyles(Styles, "Input Input-Text")}>
      <h3>{question.title}</h3>
      <InStatisticableField type={question.type} />
    </div>
  )
}


export const Textarea: React.FC<{
  question: InputTypes['Textarea']
}> = ({question}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Textarea")}>
      <h3>{question.title}</h3>
      <InStatisticableField type={question.type} />
    </div>
  )
}


export const SecuredInput: React.FC<{
  question: InputTypes['SecuredInput']
}> = ({question}) => {

  return (
    <div className={getStyles(Styles, "Input Input-SecuredInput")}>
      <h3>{question.title}</h3>
      <InStatisticableField type={question.type} />
    </div>
  )
}


export const Number: React.FC<{
  question: InputTypes['Number']
}> = ({question}) => {
  
  return (
    <div className={getStyles(Styles, "Input Input-Range")}>
      <h3>{question.title}</h3>
      <input type="number" />
    </div>
  )
}


export const Checkbox: React.FC<{
  question: InputTypes['Checkbox'],
  name: string
}> = ({question, name}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Checkbox")}>
      <input type="checkbox" name={name} id={question.name} disabled />
      <label htmlFor={question.name}>{question.title}</label>
    </div>
  )
}


export const Image: React.FC<{
  question: InputTypes['Image']
}> = ({question}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Image")}>
      
    </div>
  )
}


export const RadioboxList: React.FC<{
  question: InputTypes['Radiobox List']
}> = ({question}) => {

  // States
  let answers_amount: number = 0,
    avg_answer: {[q_name: string]: number} = {}

  const { AllAnswers } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)

  if (AllAnswers) {
    Object.entries(AllAnswers).map((UserAnswer, i) => {
      // username: { q1: {...}, q2: {...} }
      console.log(i + " | " + question.title + " : ", UserAnswer[1][question.name])
      const checkedElement = (UserAnswer[1][question.name] as ServerFormInputTypes['Radiobox List']).checkedElement ?? null
      if (checkedElement) {
        answers_amount ++
        // init firld on first instance
        if (!avg_answer[checkedElement]) avg_answer[checkedElement] = 1
        // increment instance
        else avg_answer[checkedElement]++
      }
    })
    // console.log(answers_amount, avg_answer)
  }

  return (
    <div className={getStyles(Styles, "Input Input-List Input-RadioboxList")}>
      <h3>{question.title}</h3>
      <h6>Answers: {answers_amount}</h6>
      <div className={Styles["data-section"]}>
        <div className={Styles["Input-container"]}>
          {question.elements.map((input, i) => 
            <Radiobox key={input.name} 
              question={input}
              isChecked={true}
              name={question.name} />)}
        </div>
        <div className={Styles["stats-container"]}>
          somestats
        </div>
      </div>
    </div>
  )
}


export const CheckboxList: React.FC<{
  question: InputTypes['Checkbox List']
}> = ({question}) => {

  // States
  let answers_amount: number = 0,
    avg_answer: {[q_name: string]: number} = {}

  const { AllAnswers } = useSelector<RootState, wizard_stats_state_type>(state => state.wizard_stats)

  if (AllAnswers) {
    Object.entries(AllAnswers).map((UserAnswer, i) => {
      // username: { q1: {...}, q2: {...} }
      console.log(i + " | " + question.title + " : ", UserAnswer[1][question.name])
      const checkedElements = (UserAnswer[1][question.name] as ServerFormInputTypes['Checkbox List']).checkedElements ?? null
      if (checkedElements.length) {
        answers_amount ++
        checkedElements.map(element => {
          // init firld on first instance
          if (!avg_answer[element]) avg_answer[element] = 1
          // increment instance
          else avg_answer[element]++
        })
      }
    })
    // console.log(answers_amount, avg_answer)
  }

  return (
    <div className={getStyles(Styles, "Input Input-List Input-CheckboxList")}>
      <h3>{question.title}</h3>
      <h6>Answers: {answers_amount}</h6>
      <div className={Styles["data-section"]}>
        <div className={Styles["Input-container"]}>
          {question.elements.map((input, i) => 
            <Checkbox key={input.name} 
              question={input} 
              name={input.name} />)}
        </div>
        <div className={Styles["stats-container"]}>
          somestats
        </div>
      </div>
    </div>
  )
}


export const ListsList: React.FC<{
  question: InputTypes['Lists List']
}> = ({question}) => {

  // Dispatch
  const dispatch = useDispatch()

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
      <input type="radio" name={name} defaultChecked={isChecked} id={question.name} />
      <label htmlFor={question.name}>{question.title}</label>
    </div>
  )
}


// LABEL
// TEXT
// TEXTAREA
// SECURED_INPUT
// Number
// CHECKBOX
// IMAGE
// RADIOBOX_LIST
// CHECKBOX_LIST
// LISTS_LIST
// RADIOBOX

