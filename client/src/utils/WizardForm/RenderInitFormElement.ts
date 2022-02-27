// Render initial input value (based on given input type)

// Types:
import { InputTypes, ValidInputType, WizardFormat, WizardPageFormat, WizardSectionFormat } from "../../interfaces/WizardFormat"
import { QuestionTypes } from "../../redux/types"
import { FormInputTypes, ValidFormInputType, WizardFormFormat, WizardFormPageFormat, WizardFormSectionFormat } from '../../interfaces/WizardFormat_Form'


// Parse Lists list to valid Form-Input
const parseListsList = (element: InputTypes['Lists List']): FormInputTypes['Lists List']['elements'] => {
  return element.elements.map(list => {
    if (list.type === QuestionTypes.CHECKBOX_LIST)
      return {
        ...list,
        checkedElements: [...list.checkedInputs]
      }
      else return {
        ...list,
        checkedElement: list.checkedInput
      }
  })
}


// Renders Initial form-input structure to be answered with value
export const RenderInitFormInput = (question: ValidInputType): ValidFormInputType => {
  // Return Initial element object
  switch (question.type) {
    // Case for every question type
    case QuestionTypes.TEXT:
      return {
        ...question,
        value: ""
      }
    case QuestionTypes.CHECKBOX:
      return {
        ...question
      }
    case QuestionTypes.RADIOBOX:
      return {
        ...question
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
        ...question,
        value: ""
      }
    case QuestionTypes.NUMBER:
      return {
        ...question,
        value: 0
      }
    case QuestionTypes.TEXTAREA:
      return {
        ...question,
        value: ""
      }
    case QuestionTypes.CHECKBOX_LIST:
      return {
        ...question,
        checkedInputs: [...question.checkedInputs]
      }
    case QuestionTypes.RADIOBOX_LIST:
      return {
        ...question,
        checkedInput: question.checkedInput
      }
    case QuestionTypes.LISTS_LIST:
      return {
        ...question,
        elements: parseListsList(question)
      }
    case QuestionTypes.LABEL:
    default: 
      return {
        ...question
      }
  }
}


// Renders Initial section structure and inserts it as one of the wizard elements
export const RenderInitFormSection = (section: WizardSectionFormat): WizardFormSectionFormat => {
  return {
    name: section.name,
    elements: section.elements.map(question => RenderInitFormInput(question))
  }
}


// Renders Initial page structure and inserts it as one of the wizard elements
export const RenderInitFormPage = (page: WizardPageFormat): WizardFormPageFormat => {
  return page.map(section => RenderInitFormSection(section))
}


// Renders Initial page structure and inserts it as one of the wizard elements
export const RenderInitForm = (wizard: WizardFormat): WizardFormFormat => ({
  name: wizard.name,
  id: wizard.id,
  pages: wizard.pages.map(page => RenderInitFormPage(page))
})

