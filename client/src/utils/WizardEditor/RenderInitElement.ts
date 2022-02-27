// Render initial input value (based on given input type)

import { v4 as uuidv4 } from 'uuid'
// Types:
import { RootState } from "../../redux"
import { ValidInputType, WizardFormat, WizardPageFormat, WizardSectionFormat } from "../../interfaces/WizardFormat"
import { QuestionTypes } from "../../redux/types"


type RenderInitInput__props = (
  ActionTrigger: RootState['wizard_editor']['ActionTrigger']
) => ValidInputType

// Renders Initial input structure and inserts it as one of the wizard elements
export const RenderInitInput: RenderInitInput__props = (ActionTrigger) => {
  // Return Initial element object
  switch (ActionTrigger.QuestionType) {
    // Case for every question type
    case QuestionTypes.TEXT:
      return {
        type: QuestionTypes.TEXT,
        min: 6,
        max: 16,
        name: uuidv4(),
        regex: null,
        title: "New Text field",
        required: false
      }
    case QuestionTypes.CHECKBOX:
      return {
        type: QuestionTypes.CHECKBOX,
        alreadyChecked: false,
        name: uuidv4(),
        title: "New Checkbox field"
      }
    case QuestionTypes.RADIOBOX:
      return {
        type: QuestionTypes.RADIOBOX,
        alreadyChecked: false,
        name: uuidv4(),
        title: "New Radiobox field"
      }
    // case QuestionTypes.IMAGE:
    //   return {
    //     type: QuestionTypes.IMAGE,
    //     name: uuidv4(),
    //     title: "New Image",
    //     url: null
    //   }
    case QuestionTypes.SECURED_INPUT:
      return {
        type: QuestionTypes.SECURED_INPUT,
        min: 6,
        max: 16,
        name: uuidv4(),
        regex: null,
        required: false,
        title: "New SecuredInput field",
      }
    case QuestionTypes.NUMBER:
      return {
        type: QuestionTypes.NUMBER,
        min: 6,
        max: 16,
        name: uuidv4(),
        required: false,
        title: "New Range field"
      }
    case QuestionTypes.TEXTAREA:
      return {
        type: QuestionTypes.TEXTAREA,
        min: 6,
        max: 16,
        name: uuidv4(),
        required: false,
        title: "New Range field",
        regex: null
      }
    case QuestionTypes.CHECKBOX_LIST:
      return {
        type: QuestionTypes.CHECKBOX_LIST,
        name: uuidv4(),
        title: "New Checkbox List",
        checkedInputs: [],
        elements: []
      }
    case QuestionTypes.RADIOBOX_LIST:
      return {
        type: QuestionTypes.RADIOBOX_LIST,
        name: uuidv4(),
        title: "New Radiobox List",
        checkedInput: null,
        elements: []
      }
    case QuestionTypes.LISTS_LIST:
      return {
        type: QuestionTypes.LISTS_LIST,
        name: uuidv4(),
        title: "New Lists List",
        elements: []
      }
    case QuestionTypes.LABEL:
    default: 
      return {
        type: QuestionTypes.LABEL,
        title: "New Label field",
        name: uuidv4(),
      }
  }
}


// Renders Initial section structure and inserts it as one of the wizard elements
export const RenderInitSection = (): WizardSectionFormat => ({
  name: "",
  elements: []  
})


// Renders Initial page structure and inserts it as one of the wizard elements
export const RenderInitPage = (): WizardPageFormat => ([])
