// Render initial input value (based on given input type)

// Types:
import { InputTypes, ValidInputType, WizardFormat, WizardPageFormat, WizardSectionFormat } from "../../interfaces/WizardFormat"
import { QuestionTypes } from "../../redux/types"
import { ServerFormInputTypes, ValidServerFormInputType, WizardServerFormFormat, WizardServerFormPageFormat, WizardServerFormSectionFormat } from '../../interfaces/WizardFormat_Server'
import { ValidFormInputType, WizardFormFormat, WizardFormPageFormat, WizardFormSectionFormat } from "../../interfaces/WizardFormat_Form"


// Parse Lists list to valid Form-Input
const parseListsList = (element: InputTypes['Lists List'], isMovingBack: boolean): ServerFormInputTypes['Lists List']['elements'] => {
  return element.elements.map(list => {
    if (list.type === QuestionTypes.CHECKBOX_LIST) return {
        name: list.name,
        type: QuestionTypes.CHECKBOX_LIST,
        checkedElements: list.checkedInputs
      }
    else {
      // Validate values only on move=NEXT
      if (!isMovingBack && !list.checkedInput) throw new Error("Must pick at least 1 radiobox")
      return {
        name: list.name,
        type: QuestionTypes.RADIOBOX_LIST,
        checkedElement: list.checkedInput
      }
    }
  })
}


// Renders Initial input structure and inserts it as one of the wizard elements
// Also Validates the values (throw error if failed validating)
export const RenderToServerFormInput = (question: ValidFormInputType, isMovingBack: boolean): ValidServerFormInputType => {
  // Return Initial element object
  switch (question.type) {
    // Case for every question type
    case QuestionTypes.TEXT:
      // Validate values only on move=NEXT
      if (!isMovingBack) {
        // Validate value
        if (question.value.length > question.max) throw new Error("Answer is too long")
        if (question.value.length < question.min) throw new Error("Answer is too short")
        if (question.regex && (question.regex?.test(question.value) === false)) throw new Error("Answer doesn't match regex")
        if (question.required && !question.value.length) throw new Error("Question is empty")
      }
      // Return answer as server-format
      return {
        type: QuestionTypes.TEXT,
        name: question.name,
        value: question.value
      }
    case QuestionTypes.CHECKBOX:
      return {
        type: QuestionTypes.CHECKBOX,
        name: question.name
      }
    case QuestionTypes.RADIOBOX:
      return {
        type: QuestionTypes.RADIOBOX,
        name: question.name
      }
    // case QuestionTypes.IMAGE:
    //   return {
    //     type: QuestionTypes.IMAGE,
    //     name: uuidv4(),
    //     title: "New Image",
    //     url: null
    //   }
    case QuestionTypes.SECURED_INPUT:
      // Validate values only on move=NEXT
      if (!isMovingBack) {
        // Validate value
        if (question.value.length > question.max) throw new Error("Answer is too long")
        if (question.value.length < question.min) throw new Error("Answer is too short")
        if (question.regex && (question.regex?.test(question.value) === false)) throw new Error("Answer doesn't match regex")
        if (question.required && !question.value.length) throw new Error("Question is empty")
      }
      return {
        type: QuestionTypes.SECURED_INPUT,
        name: question.name,
        value: question.value
      }
    case QuestionTypes.NUMBER:
      // Validate values only on move=NEXT
      if (!isMovingBack) {
        // Validate value
        if (question.value > question.max) throw new Error("Answer is too long")
        if (question.value < question.min) throw new Error("Answer is too short")
      }
      return {
        type: QuestionTypes.NUMBER,
        name: question.name,
        value: question.value
      }
    case QuestionTypes.TEXTAREA:
      // Validate values only on move=NEXT
      if (!isMovingBack) {
        // Validate value
        if (question.value.length > question.max) throw new Error("Answer is too long")
        if (question.value.length < question.min) throw new Error("Answer is too short")
        if (question.regex && (question.regex?.test(question.value) === false)) throw new Error("Answer doesn't match regex")
        if (question.required && !question.value.length) throw new Error("Question is empty")
      }
      return {
        type: QuestionTypes.TEXTAREA,
        name: question.name,
        value: question.value
      }
    case QuestionTypes.CHECKBOX_LIST:
      return {
        type: QuestionTypes.CHECKBOX_LIST,
        name: question.name,
        checkedElements: [...question.checkedInputs]
      }
    case QuestionTypes.RADIOBOX_LIST:
      // Validate values only on move=NEXT
      if (!isMovingBack && !question.checkedInput) throw new Error("Must pick at least 1 radiobox")
      return {
        type: QuestionTypes.RADIOBOX_LIST,
        name: question.name,
        checkedElement: question.checkedInput
      }
    case QuestionTypes.LISTS_LIST:
      return {
        type: QuestionTypes.LISTS_LIST,
        name: question.name,
        elements: [...parseListsList(question, isMovingBack)]
      }
    case QuestionTypes.LABEL:
    default: 
      return {
        type: QuestionTypes.LABEL,
        name: question.name
      }
  }
}


// Renders Initial section structure and inserts it as one of the wizard elements
export const RenderToServerFormSection = (section: WizardFormSectionFormat, isMovingBack: boolean): WizardServerFormSectionFormat => {
  return {
    name: section.name,
    elements: section.elements.map(question => RenderToServerFormInput(question, isMovingBack))
  }
}


// Renders Initial page structure and inserts it as one of the wizard elements
export const RenderToServerFormPage = (page: WizardFormPageFormat, isMovingBack: boolean): WizardServerFormPageFormat => {
  return page.map(section => RenderToServerFormSection(section, isMovingBack))
}


// Renders Initial page structure and inserts it as one of the wizard elements
export const RenderToServerForm = (wizard: WizardFormFormat, isMovingBack: boolean): WizardServerFormFormat => ({
  name: wizard.name,
  id: wizard.id,
  pages: wizard.pages.map(page => RenderToServerFormPage(page, isMovingBack))
})

