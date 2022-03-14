// Render initial input value (based on given input type)

// Types:
import { QuestionTypes, ResultQuestions } from "../../redux/types"
import { ValidFormInputType, WizardFormFormat, WizardFormPageFormat, WizardFormSectionFormat } from "../../interfaces/WizardFormat_Form"


// Renders Initial input structure and inserts it as one of the wizard elements
// Also Validates the values (throw error if failed validating)
export const RenderToServerFormInput = (SavedAnswers: ResultQuestions, question: ValidFormInputType, isMovingBack: boolean): void => {
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
      SavedAnswers[question.name] = {
        type: QuestionTypes.TEXT,
        name: question.name,
        value: question.value
      }
      break

    case QuestionTypes.CHECKBOX:
      SavedAnswers[question.name] = {
        type: QuestionTypes.CHECKBOX,
        name: question.name
      }
      break

    case QuestionTypes.RADIOBOX:
      SavedAnswers[question.name] = {
        type: QuestionTypes.RADIOBOX,
        name: question.name
      }
      break
    case QuestionTypes.IMAGE:
      SavedAnswers[question.name] = {
        type: QuestionTypes.IMAGE,
        name: question.name
      }
      break
    case QuestionTypes.SECURED_INPUT:
      // Validate values only on move=NEXT
      if (!isMovingBack) {
        // Validate value
        if (question.value.length > question.max) throw new Error("Answer is too long")
        if (question.value.length < question.min) throw new Error("Answer is too short")
        if (question.regex && (question.regex?.test(question.value) === false)) throw new Error("Answer doesn't match regex")
        if (question.required && !question.value.length) throw new Error("Question is empty")
      }
      SavedAnswers[question.name] = {
        type: QuestionTypes.SECURED_INPUT,
        name: question.name,
        value: question.value
      }
      break

    case QuestionTypes.NUMBER:
      // Validate values only on move=NEXT
      if (!isMovingBack) {
        // Validate value
        if (question.value > question.max) throw new Error("Answer is higher than the Maximum required")
        if (question.value < question.min) throw new Error("Answer is lower than the Minimum required")
      }
      SavedAnswers[question.name] = {
        type: QuestionTypes.NUMBER,
        name: question.name,
        value: question.value
      }
      break

    case QuestionTypes.TEXTAREA:
      // Validate values only on move=NEXT
      if (!isMovingBack) {
        // Validate value
        if (question.value.length > question.max) throw new Error("Answer is too long")
        if (question.value.length < question.min) throw new Error("Answer is too short")
        if (question.regex && (question.regex?.test(question.value) === false)) throw new Error("Answer doesn't match regex")
        if (question.required && !question.value.length) throw new Error("Question is empty")
      }
      SavedAnswers[question.name] = {
        type: QuestionTypes.TEXTAREA,
        name: question.name,
        value: question.value
      }
      break

    case QuestionTypes.IMAGE_LIST:
      if (!isMovingBack && !question.checkedInput) throw new Error("Must pick at least 1 image")
      SavedAnswers[question.name] = {
        type: QuestionTypes.IMAGE_LIST,
        name: question.name,
        checkedInput: question.checkedInput
      }
      break
      
    case QuestionTypes.CHECKBOX_LIST:
      SavedAnswers[question.name] = {
        type: QuestionTypes.CHECKBOX_LIST,
        name: question.name,
        checkedElements: [...question.checkedInputs]
      }
      break

    case QuestionTypes.RADIOBOX_LIST:
      // Validate values only on move=NEXT
      if (!isMovingBack && !question.checkedInput) throw new Error("Must pick at least 1 radiobox")
      SavedAnswers[question.name] = {
        type: QuestionTypes.RADIOBOX_LIST,
        name: question.name,
        checkedElement: question.checkedInput
      }
      break

    case QuestionTypes.LISTS_LIST:
      question.elements.map(list => {
        if (list.type === QuestionTypes.CHECKBOX_LIST)
          SavedAnswers[question.name] = {
            name: list.name,
            type: QuestionTypes.CHECKBOX_LIST,
            checkedElements: list.checkedInputs
          }
        else {
          // Validate values only on move=NEXT
          if (!isMovingBack && !list.checkedInput) throw new Error("Must pick at least 1 radiobox")
          SavedAnswers[question.name] = {
            name: list.name,
            type: QuestionTypes.RADIOBOX_LIST,
            checkedElement: list.checkedInput
          }
        }
      })
      break
      
    case QuestionTypes.LABEL:
    default: 
      SavedAnswers[question.name] = {
        type: QuestionTypes.LABEL,
        name: question.name
      }
  }
}


// Renders Initial section structure and inserts it as one of the wizard elements
export const RenderToServerFormSection = (SavedAnswers: ResultQuestions, section: WizardFormSectionFormat, isMovingBack: boolean): void => {
  section.elements.map(question => RenderToServerFormInput(SavedAnswers, question, isMovingBack))
}


// Renders Initial page structure and inserts it as one of the wizard elements
export const SavePageAnswersToServerFormat = (page: WizardFormPageFormat, isMovingBack: boolean): ResultQuestions => {
  const SavedAnswers: ResultQuestions = {}
  page.map(section => RenderToServerFormSection(SavedAnswers, section, isMovingBack))
  return SavedAnswers
}
