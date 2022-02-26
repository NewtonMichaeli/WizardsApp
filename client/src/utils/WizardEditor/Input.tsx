// Inputs

// Types:
import { InputTypes } from "../../interfaces/WizardFormat"
import { QuestionTypes } from "../../redux/types"
import { InputChange, input_path_type, list_input_path_type, sub_input_path_type } from "./types"
// Styles:
import Styles from '../../styles/Utils/WizardEditor/Input.module.css'
import { getStyles } from "../../controllers"
// Utils:
import { AddInputHere, AddListHere, AddSubInputHere, DeleteInputBtn, OptionsBtn, RequiredBtn } from "./InputUtils"
import { useDispatch } from "react-redux"
import { RemoveElement } from "../../redux/actions/WizardEditor"


export const Label: React.FC<{
  element: InputTypes['Label'],
  path: input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()

  return (
    <div className={getStyles(Styles, "Input Input-Label")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Enter your Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={() => dispatch(RemoveElement.Question(path))} />
        </div>
      </div>
      {/* add input here */}
      <AddInputHere path={path} />
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const Text: React.FC<{
  element: InputTypes['Text'],
  path: input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()
  return (
    <div className={getStyles(Styles, "Input Input-Text")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Textbox Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={() => dispatch(RemoveElement.Question(path))} />
          <OptionsBtn 
            min={{initValue: element.min, onClick: min => element.min = min}}
            max={{initValue: element.max, onClick: max => element.max = max}}
            regex={{initValue: element.regex, onClick: regex => element.regex = regex}} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Text
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const Textarea: React.FC<{
  element: InputTypes['Textarea'],
  path: input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()

  return (
    <div className={getStyles(Styles, "Input Input-Textarea")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Textarea Title" />
        <div className={Styles["q-controllers"]}>
        <RequiredBtn onClick={() => element.required= !element.required} isRequired={element.required} />
        <DeleteInputBtn onClick={() => dispatch(RemoveElement.Question(path))} />
        <OptionsBtn 
          min={{initValue: element.min, onClick: min => element.min = min}}
          max={{initValue: element.max, onClick: max => element.max = max}}
          regex={{initValue: element.regex, onClick: regex => element.regex = regex}} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Textarea
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const SecuredInput: React.FC<{
  element: InputTypes['SecuredInput'],
  path: input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()

  return (
    <div className={getStyles(Styles, "Input Input-SecuredInput")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Secured-Input Title" />
        <div className={Styles["q-controllers"]}>
          <RequiredBtn onClick={() => element.required = !element.required} isRequired={element.required} />
          <DeleteInputBtn onClick={() => dispatch(RemoveElement.Question(path))} />
          <OptionsBtn 
            min={{initValue: element.min, onClick: min => element.min = min}}
            max={{initValue: element.max, onClick: max => element.max = max}}
            regex={{initValue: element.regex, onClick: regex => element.regex = regex}} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Secured Input
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const Range: React.FC<{
  element: InputTypes['Range'],
  path: input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()
  
  return (
    <div className={getStyles(Styles, "Input Input-Range")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Range Title" />
        <div className={Styles["q-controllers"]}>
          <RequiredBtn onClick={() => element.required = !element.required} isRequired={element.required} />
          <DeleteInputBtn onClick={() => dispatch(RemoveElement.Question(path))} />
          <OptionsBtn 
            min={{initValue: element.min, onClick: min => element.min = min}}
            max={{initValue: element.max, onClick: max => element.max = max}} />
        </div>
      </div>
      <h1 className={Styles["btm-section"]}>
        Range
      </h1>
      {/* add input here */}
      <AddInputHere path={path} />
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const Checkbox: React.FC<{
  element: InputTypes['Checkbox'],
  path: sub_input_path_type,
  name: string,
  isChecked: boolean,
  addCheckedInput: (name: string) => void,
  removeCheckedInput: (name: string) => void
}> = ({element, path, name, isChecked, addCheckedInput, removeCheckedInput}) => {

  // Dispatch
  const dispatch = useDispatch()
  // Handlers
  const checkHandle = (e: InputChange) => {
    if (e.target.checked) addCheckedInput(element.name)
    else removeCheckedInput(element.name)
  }

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Checkbox")}>
      <div className={Styles["upper-section"]}>
        {/* check button - sets input's name as ONE OF the checked states */}
        <input type="checkbox" title="Mark as Default Check" name={name} defaultChecked={isChecked}
          onChange={checkHandle} />
        {/* title */}
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Checkbox Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={() => dispatch(RemoveElement.SubQuestion(path))} />
        </div>
      </div>
      {/* add input here */}
      <AddSubInputHere path={path} list_type={QuestionTypes.CHECKBOX} />
    </div>
  )
}


export const Image: React.FC<{
  element: InputTypes['Image'],
  path: sub_input_path_type,
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
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const RadioboxList: React.FC<{
  element: InputTypes['Radiobox List'],
  path: list_input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()
  // Handlers
  const setCheckedInput = (name: string) => {
    element.checkedInput = name
  }

  return (
    <div className={getStyles(Styles, "Input Input-List Input-RadioboxList")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Radiobox-List Title" />
        {/* delete list */}
        <DeleteInputBtn onClick={() => dispatch(RemoveElement.QuestionList(path))} isDeleteList />
      </div>
      <div className={Styles["btm-section"]}>
        {/* render radioboxes */}
        {element.elements.map((_element, i) => 
          <Radiobox key={_element.name} 
            element={_element} 
            name={element.name} 
            isChecked={element.checkedInput === _element.name}
            setCheckedInput={setCheckedInput} 
            path={{...path, option: i, list: path.option}} />)}
      </div>
      {/* add input here */}
      {path.option !== undefined ? '' : <AddInputHere path={path as input_path_type} />}
      {/* add sub-input here (if no elements exists) */}
      {element.elements.length ? '' : 
        <AddSubInputHere 
          path={{...path, list: path.option, option: 0}} 
          list_type={QuestionTypes.RADIOBOX} noElements />}
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const CheckboxList: React.FC<{
  element: InputTypes['Checkbox List'],
  path: list_input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()
  // Handlers
  const addCheckedInput = (name: string) => {
    element.checkedInputs = [...element.checkedInputs, name]
  }
  const removeCheckedInput = (name: string) => {
    element.checkedInputs = element.checkedInputs.filter(input_name => input_name !== name)
  }

  return (
    <div className={getStyles(Styles, "Input Input-List Input-CheckboxList")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Checkbox-List Title" />
        {/* delete list */}
        <DeleteInputBtn onClick={() => dispatch(RemoveElement.QuestionList(path))} isDeleteList />
      </div>
      <div className={Styles["btm-section"]}>
        {element.elements.map((_element, i) => 
          <Checkbox key={_element.name} 
            element={_element} 
            name={element.name}
            isChecked={element.checkedInputs.includes(_element.name)}
            addCheckedInput={addCheckedInput}
            removeCheckedInput={removeCheckedInput}
            path={{...path, option: i, list: path.option}} />)}
      </div>
      {/* add input here */}
      {path.option !== undefined ? '' : <AddInputHere path={path as input_path_type} />}
      {/* add sub-input here (if no elements exists) */}
      {element.elements.length ? '' :
        <AddSubInputHere path={{...path, list: path.option, option: 0}} 
          list_type={QuestionTypes.CHECKBOX} 
          noElements />}
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const ListsList: React.FC<{
  element: InputTypes['Lists List'],
  path: input_path_type,
}> = ({element, path}) => {

  // Dispatch
  const dispatch = useDispatch()

  return (
    <div className={getStyles(Styles, "Input Input-List Input-ListsList")}>
      <div className={Styles["upper-section"]}>
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Lists-List Title" />
        {/* delete list */}
        <DeleteInputBtn onClick={() => dispatch(RemoveElement.QuestionList(path))} isDeleteList />
      </div>
      <div className={Styles["btm-section"]}>
        {/* map through elements */}
        {element.elements.map((_element, i) => {
          if (_element.type === QuestionTypes.CHECKBOX_LIST)
            return <CheckboxList key={_element.name} element={_element} path={{
              ...path,
              option: i
            }} />
          else if (_element.type === QuestionTypes.RADIOBOX_LIST) 
            return <RadioboxList key={_element.name} element={_element} path={{
              ...path,
              option: i
          }} />
        })}
      </div>
      {/* add input here */}
      <AddInputHere path={path as input_path_type} />
      {/* add sub-list here */}
      {element.elements.length ? '' : 
        <AddListHere path={{...path, option: 0}} noElements isInsideList />}
      {/* add list here */}
      <AddListHere path={path} />
    </div>
  )
}


export const Radiobox: React.FC<{
  element: InputTypes['Radiobox'],
  path: sub_input_path_type,
  name: string,
  isChecked: boolean,
  setCheckedInput: (name: string) => void
}> = ({element, path, name, isChecked, setCheckedInput}) => {

  // Dispatch
  const dispatch = useDispatch()

  return (
    <div className={getStyles(Styles, "Input Input-Partial Input-Radiobox")}>
      <div className={Styles["upper-section"]}>
        {/* radio button - sets input's name as the checked state */}
        <input type="radio" title="Mark as Default Check" name={name} defaultChecked={isChecked} 
          onClick={() => setCheckedInput(element.name)} />
        {/* title input */}
        <input onChange={(e: InputChange) => element.title = e.target.value}
          className={Styles["title"]}
          type="text"
          name={element.name}
          defaultValue={element.title}
          placeholder="Enter your Title" />
        <div className={Styles["q-controllers"]}>
          <DeleteInputBtn onClick={() => dispatch(RemoveElement.SubQuestion(path))} />
        </div>
      </div>
      {/* add input here */}
      <AddSubInputHere path={path} list_type={QuestionTypes.RADIOBOX} />
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

