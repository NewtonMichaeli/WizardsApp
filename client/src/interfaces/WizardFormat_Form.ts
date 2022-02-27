// Interfaces for Wizard structure formatting

import { Url } from "url"
import { QuestionTypes } from "../redux/types"


// All Input types for a Wizard to have
export interface FormInputTypes {
    "Label": {
        type: QuestionTypes.LABEL,
        title: string,
        name: string
    },
    "Checkbox": {
        type: QuestionTypes.CHECKBOX,
        title: string,
        name: string
    },
    "Text": {
        type: QuestionTypes.TEXT,
        title: string,
        name: string,
        regex: RegExp | null,
        required: boolean
        min: number,
        max: number,
        // value - stricted by the previous conditions
        value: string
    },
    "Textarea": {
        type: QuestionTypes.TEXTAREA,
        title: string,
        name: string,
        regex: RegExp | null,
        required: boolean
        min: number,
        max: number,
        // value - stricted by the previous conditions
        value: string
    },
    "Number": {
        type: QuestionTypes.NUMBER,
        title: string,
        name: string,
        required: boolean,
        min: number,
        max: number,
        // value - stricted by the previous conditions
        value: number
    },
    "Radiobox": {
        type: QuestionTypes.RADIOBOX,
        title: string,
        name: string
    },
    "SecuredInput": {
        type: QuestionTypes.SECURED_INPUT,
        title: string,
        name: string,
        regex: RegExp | null,
        required: boolean
        min: number,
        max: number,
        // value - stricted by the previous conditions
        value: string
    },
    "Image": {
        type: QuestionTypes.IMAGE,
        name: string
        title: string,
        url: Url,   // either 
    }
    "Radiobox List": {
        type: QuestionTypes.RADIOBOX_LIST,
        name: string,
        title: string,
        checkedInput: string | null,
        elements: FormInputTypes['Radiobox'][]
    },
    "Checkbox List": {
        type: QuestionTypes.CHECKBOX_LIST,
        name: string,
        title: string,
        checkedInputs: string[]
        elements: FormInputTypes['Checkbox'][]
    },
    "Lists List": {
        type: QuestionTypes.LISTS_LIST,
        name: string,
        title: string,
        elements: (
            FormInputTypes['Checkbox List'] | FormInputTypes['Radiobox List']
        )[]
    }
}

// Wizard : page : section : Input
export type ValidFormInputType =
    FormInputTypes['Label'] |
    FormInputTypes['Checkbox'] |
    FormInputTypes['Radiobox'] |
    FormInputTypes['Number'] |
    FormInputTypes['SecuredInput'] |
    FormInputTypes['Text'] |
    FormInputTypes['Textarea'] |
    FormInputTypes['Checkbox List'] |
    FormInputTypes['Radiobox List'] |
    FormInputTypes['Lists List'] | 
    FormInputTypes['Image']


// Wizard : page : section - Format
export type WizardFormSectionFormat = {
    name: string,
    elements: ValidFormInputType[/*elements*/]
}

// Wizard : page - Format
export type WizardFormPageFormat = WizardFormSectionFormat[]

// Wizards format
export type WizardFormFormat = {
    name: string,
    id: string,
    pages: WizardFormPageFormat[]
}

