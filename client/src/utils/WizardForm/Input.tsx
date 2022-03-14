// Inputs

import { useState } from "react"
import { useDispatch } from "react-redux"
// Types:
import { InputChange, TextareaChange } from "../WizardEditor/types"
import { FormInputTypes } from "../../interfaces/WizardFormat_Form"
// Assets:
import noimg from '../../assets/Q-controllers/noimg.png'
// Styles:
import Styles from '../../styles/Utils/WizardForm/Input.module.css'
import { getStyles } from "../../controllers"
// Types:
import { QuestionTypes } from "../../redux/types"


export const Label: React.FC<{
  question: FormInputTypes['Label']
}> = ({question}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Label")}>
      <h3>{question.title}</h3>
    </div>
  )
}


export const Text: React.FC<{
  question: FormInputTypes['Text']
}> = ({question}) => {

  // Handlers
  const Write = (e: InputChange) => 
    // -- change value directly into state by reference:
    question.value = e.target.value

  return (
    <div className={getStyles(Styles, "Input Input-Text")}>
      <h3>{question.title}</h3>
      <input type="text" onChange={Write} defaultValue={question.value} />
    </div>
  )
}


export const Textarea: React.FC<{
  question: FormInputTypes['Textarea']
}> = ({question}) => {

  // Handlers
  const Write = (e: TextareaChange) => 
    // -- change value directly into state by reference:
    question.value = e.target.value

  return (
    <div className={getStyles(Styles, "Input Input-Textarea")}>
      <h3>{question.title}</h3>
      <textarea cols={30} rows={10} onChange={Write} defaultValue={question.value} />
    </div>
  )
}


export const SecuredInput: React.FC<{
  question: FormInputTypes['SecuredInput']
}> = ({question}) => {

  // Handlers
  const Write = (e: InputChange) => 
    // -- change value directly into state by reference:
    question.value = e.target.value

  return (
    <div className={getStyles(Styles, "Input Input-SecuredInput")}>
      <h3>{question.title}</h3>
      <input type="password" onChange={Write} defaultValue={question.value} />
    </div>
  )
}


export const Number: React.FC<{
  question: FormInputTypes['Number']
}> = ({question}) => {

  const Write = (e: InputChange) => 
    // -- change value directly into state by reference:
    question.value = parseInt(e.target.value) ?? 0
  
  return (
    <div className={getStyles(Styles, "Input Input-Range")}>
      <h3>{question.title}</h3>
      <input type="number" onChange={Write} defaultValue={question.value} />
    </div>
  )
}


export const Checkbox: React.FC<{
  question: FormInputTypes['Checkbox'],
  name: string,
  isChecked: boolean,
  addCheckedInput: (name: string) => void,
  removeCheckedInput: (name: string) => void
}> = ({question, name, isChecked, addCheckedInput, removeCheckedInput}) => {

  // Handlers
  const checkHandle = (e: InputChange) => {
    if (e.target.checked) addCheckedInput(question.name)
    else removeCheckedInput(question.name)
  }

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Checkbox")}>
      <input type="checkbox" name={name} onChange={checkHandle} defaultChecked={isChecked} id={question.name} />
      <label htmlFor={question.name}>{question.title}</label>
    </div>
  )
}


export const Image: React.FC<{
  question: FormInputTypes['Image'],
  name: string,
  isChecked: boolean,
  setCheckedInput: (name: string) => void
}> = ({question, isChecked, name, setCheckedInput}) => {

  // Handlers
  const imageNotFoundHandler = (e: EventTarget & HTMLImageElement) => {
    e.onerror = null
    e.src = noimg
  }

  return (
    <div className={getStyles(Styles, `Input Input-Partial Input-Image ${isChecked ? 'selected-image' : ''}`)}>
      <img src={question.url} onError={({currentTarget}) => imageNotFoundHandler(currentTarget)} 
        alt={question.title} title={isChecked ? '' : "Check as Default"} onClick={() => setCheckedInput(question.name)} />
    </div>
  )
}


export const ImagesList: React.FC<{
  question: FormInputTypes['Image List']
}> = ({question}) => {

  // States
  const [checkedInput, setCheckedInput] = useState(question.checkedInput)
  // Handlers
  const setCheckedInputHandler = (name: string) => {
    question.checkedInput = name
    setCheckedInput(name)
  }
  return (
    <div className={getStyles(Styles, "Input Input-List Input-ImageList")}>
      <h3>{question.title}</h3>
      <div className={Styles["Input-container"]}>
        {/* render images */}
        {question.elements.map((_element, i) => 
          <Image key={_element.name} 
            question={_element} 
            name={question.name} 
            isChecked={checkedInput === _element.name}
            setCheckedInput={setCheckedInputHandler} />)}
      </div>
    </div>
  )
}


export const RadioboxList: React.FC<{
  question: FormInputTypes['Radiobox List']
}> = ({question}) => {

  // Handlers
  const setCheckedInput = (name: string) => {
    question.checkedInput = name
  }

  return (
    <div className={getStyles(Styles, "Input Input-List Input-RadioboxList")}>
      <h3>{question.title}</h3>
      <div className={Styles["Input-container"]}>
        {question.elements.map((input, i) => 
          <Radiobox key={input.name} 
            question={input} 
            name={question.name}
            isChecked={question.checkedInput === input.name}
            setCheckedInput={setCheckedInput} />)}
      </div>
    </div>
  )
}


export const CheckboxList: React.FC<{
  question: FormInputTypes['Checkbox List']
}> = ({question}) => {

  // Handlers
  const addCheckedInput = (name: string) => {
    question.checkedInputs = [...question.checkedInputs, name]
  }
  const removeCheckedInput = (name: string) => {
    question.checkedInputs = question.checkedInputs.filter(input_name => input_name !== name)
  }
  
  return (
    <div className={getStyles(Styles, "Input Input-List Input-CheckboxList")}>
      <h3>{question.title}</h3>
      <div className={Styles["Input-container"]}>
        {question.elements.map((input, i) => 
          <Checkbox key={input.name} 
            question={input} 
            name={input.name}
            isChecked={question.checkedInputs.includes(input.name)}
            addCheckedInput={addCheckedInput}
            removeCheckedInput={removeCheckedInput} />)}
      </div>
    </div>
  )
}


export const ListsList: React.FC<{
  question: FormInputTypes['Lists List']
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
  question: FormInputTypes['Radiobox']
  name: string,
  isChecked: boolean,
  setCheckedInput: (name: string) => void
}> = ({question, name, isChecked, setCheckedInput}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Radiobox")}>
      <input type="radio" name={name} onChange={() => setCheckedInput(question.name)} defaultChecked={isChecked} id={question.name} />
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

