// Interfaces for Wizard structure formatting

import { Url } from "url"
import { QuestionTypes } from "../redux/types"


// All Input types for a Wizard to have
export interface ServerFormInputTypes {
  "Label": {
    type: QuestionTypes.LABEL,
    name: string
  },
  "Checkbox": {
    type: QuestionTypes.CHECKBOX,
    name: string
  },
  "Text": {
    type: QuestionTypes.TEXT,
    name: string,
    value: string
  },
  "Textarea": {
    type: QuestionTypes.TEXTAREA,
    name: string,
    value: string
  },
  "Number": {
    type: QuestionTypes.NUMBER,
    name: string,
    value: number
  },
  "Radiobox": {
    type: QuestionTypes.RADIOBOX,
    name: string
  },
  "SecuredInput": {
    type: QuestionTypes.SECURED_INPUT,
    name: string,
    value: string
  },
  "Image": {
    type: QuestionTypes.IMAGE,
    name: string,
    // title: string,
    // url: string
  }
  "Image List": {
    type: QuestionTypes.IMAGE_LIST,
    name: string
    checkedInput: string | null
  },
  "Radiobox List": {
    type: QuestionTypes.RADIOBOX_LIST,
    name: string,
    checkedElement: string | null   // radiobox name
  },
  "Checkbox List": {
    type: QuestionTypes.CHECKBOX_LIST,
    name: string,
    checkedElements: string[]   // checkbox names
  },
  "Lists List": {
    type: QuestionTypes.LISTS_LIST,
    name: string,
    elements: (
      ServerFormInputTypes['Checkbox List'] | ServerFormInputTypes['Radiobox List']
    )[]
  }
}

// Wizard : page : section : Input
export type ValidServerFormInputType =
  ServerFormInputTypes['Label'] |
  ServerFormInputTypes['Checkbox'] |
  ServerFormInputTypes['Radiobox'] |
  ServerFormInputTypes['Number'] |
  ServerFormInputTypes['SecuredInput'] |
  ServerFormInputTypes['Text'] |
  ServerFormInputTypes['Textarea'] |
  ServerFormInputTypes['Checkbox List'] |
  ServerFormInputTypes['Radiobox List'] |
  ServerFormInputTypes['Image List'] | 
  ServerFormInputTypes['Lists List'] | 
  ServerFormInputTypes['Image']


// Wizard : page : section - Format
export type WizardServerFormSectionFormat = {
  name: string,
  elements: ValidServerFormInputType[/*elements*/]
}


// Wizard : page - Format
export type WizardServerFormPageFormat = WizardServerFormSectionFormat[]


// Wizards format
export type WizardServerFormFormat = {
  name: string,
  id: string,
  DoC: number,
  canNavigate: boolean,
  pages: WizardServerFormPageFormat[]
}

