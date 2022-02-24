// Inputs

// Types:
import { input_path_type } from "../../components/WizardEditor/Wizard.Input"
import { InputTypes } from "../../interfaces/WizardFormat"
// Styles:
import Styles from '../../styles/Utils/WizardEditor/Input.module.css'
import { getStyles } from "../../controllers"
// Utils:
import { AddInputHere, DeleteInputBtn, OptionsBtn, RequiredBtn } from "./InputUtils"


export type InputChange = React.ChangeEvent<HTMLInputElement>


export const Label: React.FC<{
  element: InputTypes['Label'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Label")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Enter your Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={()=>2} />
        </div>
      </div>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const Text: React.FC<{
  element: InputTypes['Text'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Text")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Textbox Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={()=>2} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Text
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const Textarea: React.FC<{
  element: InputTypes['Textarea'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Textarea")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Textarea Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={()=>2} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Textarea
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const SecuredInput: React.FC<{
  element: InputTypes['SecuredInput'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-SecuredInput")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Secured-Input Title" />
        <div className={Styles["q-controllers"]}>
        <RequiredBtn onClick={()=>2} />
          <DeleteInputBtn onClick={()=>2} />
          <OptionsBtn onClick={()=>2} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Secured Input
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const Range: React.FC<{
  element: InputTypes['Range'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Range")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Range Title" />
        <div className={Styles["q-controllers"]}>
          <RequiredBtn onClick={()=>2} />
          <DeleteInputBtn onClick={()=>2} />
          <OptionsBtn onClick={()=>2} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Range
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const Checkbox: React.FC<{
  element: InputTypes['Checkbox'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Checkbox")}>
      <div className={Styles["upper-section"]}>
        <input type="checkbox" title="Mark as Default Check" />
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Checkbox Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={()=>2} />
          <OptionsBtn onClick={()=>2} />
        </div>
      </div>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const Image: React.FC<{
  element: InputTypes['Image'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Image")}>
      <input onChange={(e: InputChange) => element.title = e.target.value}
        className="title"
        type="text" />
      <input type="range" disabled
        className="fake-box" />
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const RadioboxList: React.FC<{
  element: InputTypes['Radiobox List'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-List Input-RadioboxList")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Radiobox-List Title" />
      </div>
      <div className={Styles["btm-section"]}>
        {element.elements.map((_element, i) => 
          <Radiobox element={_element} path={path} />)}
      </div>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const CheckboxList: React.FC<{
  element: InputTypes['Checkbox List'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-List Input-CheckboxList")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Checkbox-List Title" />
      </div>
      <div className={Styles["btm-section"]}>
        {element.elements.map((_element, i) => 
          <Checkbox element={_element} path={path} />)}
      </div>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const ListsList: React.FC<{
  element: InputTypes['Lists List'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-List Input-ListsList")}>
      <input onChange={(e: InputChange) => element.title = e.target.value}
        className="title"
        type="text" />
      {}
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}


export const Radiobox: React.FC<{
  element: InputTypes['Radiobox'],
  path: input_path_type,
}> = ({element, path}) => {

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Radiobox")}>
      <div className={Styles["upper-section"]}>
        <input type="radio" title="Mark as Default Check" />
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          placeholder="Enter your Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={()=>2} />
          <OptionsBtn onClick={()=>2} />
        </div>
      </div>
      {/* add input here */}
      <AddInputHere path={path} />
    </div>
  )
}




// LABEL
// TEXT
// TEXTAREA
// SECURED_INPUT
// RANGE
// CHECKBOX
// IMAGE
// RADIOBOX_LIST
// CHECKBOX_LIST
// LISTS_LIST
// RADIOBOX

