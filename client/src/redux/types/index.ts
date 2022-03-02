// All Types

// Types:
import { ValidServerFormInputType, WizardServerFormFormat } from "../../interfaces/WizardFormat_Server";


export enum QuestionTypes {
  LABEL = "Label",
  TEXT = "Text",
  CHECKBOX = "Checkbox",
  IMAGE = "Image",
  TEXTAREA = "Textarea",
  SECURED_INPUT = "SecuredInput",
  RADIOBOX_LIST = "Radiobox List",
  CHECKBOX_LIST = "Checkbox List",
  LISTS_LIST = "Lists List",
  NUMBER = "Number",
  RADIOBOX = "Radiobox",
}

export enum ElementTypes {
  PAGE = "PAGE",
  SECTION = "SECTION",
  QUESTION = "QUESTION",
  QUESTION_LIST = "QUESTION_LIST",
  SUB_QUESTION = "SUB_QUESTION"
}

export type ServerResultsType = {
  username: string,
  email: string,
  data: ValidServerFormInputType[]
}

export interface MappedUserResultsType {
  [username: string]: ResultQuestions
}

export interface ResultQuestions {
  [q_name: string]: ValidServerFormInputType
}
