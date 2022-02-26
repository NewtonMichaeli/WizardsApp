// Interfaces for Wizard structure formatting

import { Url } from "url"
import { QuestionTypes } from "../redux/types"


// All Input types for a Wizard to have
export interface InputTypes {
    "Label": {
        type: QuestionTypes.LABEL,
        title: string,
        name: string,
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
        max: number
    },
    "Textarea": {
        type: QuestionTypes.TEXTAREA,
        title: string,
        name: string,
        regex: RegExp | null,
        required: boolean
        min: number,
        max: number
    },
    "Range": {
        type: QuestionTypes.RANGE,
        title: string,
        name: string,
        required: boolean,
        min: number,
        max: number
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
        max: number
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
        elements: InputTypes['Radiobox'][]
    },
    "Checkbox List": {
        type: QuestionTypes.CHECKBOX_LIST,
        name: string,
        title: string,
        checkedInputs: string[]
        elements: InputTypes['Checkbox'][]
    },
    "Lists List": {
        type: QuestionTypes.LISTS_LIST,
        name: string,
        title: string,
        elements: (
            InputTypes['Checkbox List'] | InputTypes['Radiobox List']
        )[]
    }
}

// Wizard : page : section : Input
export type ValidInputType =
    InputTypes['Label'] |
    InputTypes['Checkbox'] |
    InputTypes['Radiobox'] |
    InputTypes['Range'] |
    InputTypes['SecuredInput'] |
    InputTypes['Text'] |
    InputTypes['Textarea'] |
    InputTypes['Checkbox List'] |
    InputTypes['Radiobox List'] |
    InputTypes['Lists List'] | 
    InputTypes['Image']

// Wizard : page : section : Input-List
export type ValidInputListType =
    InputTypes['Checkbox List'] |
    InputTypes['Radiobox List'] |
    InputTypes['Lists List']

// Wizard : page : section : Input-List
export type ValidSubInputType =
    InputTypes['Checkbox'] |
    InputTypes['Radiobox']


// Wizard : page : section - Format
export type WizardSectionFormat = {
    name: string,
    elements: ValidInputType[/*elements*/]
}

// Wizard : page - Format
export type WizardPageFormat = WizardSectionFormat[]

// Wizards format
export type WizardFormat = {
    name: string,
    id: string,
    pages: WizardPageFormat[]
}


// export dummy wizard
export const fake_wizard: WizardFormat[] = [
    {
        name: "Wizard 1.0",
        id: "j18cn63ng98hHi9",
        pages: [
            // page 1
            [
                // section 1
                {
                    name: "Section 1",
                    elements: [
                        {
                            type: QuestionTypes.LABEL,
                            title: "Hi",
                            name: "1",
                        },
                        {
                            type: QuestionTypes.TEXT,
                            title: "Enter your Name",
                            name: "2",
                            min: 6,
                            max: 32,
                            regex: null,
                            required: true
                        },
                        {
                            type: QuestionTypes.LABEL,
                            title: "Hi Again",
                            name: "3",
                        },
                        {
                            type: QuestionTypes.SECURED_INPUT,
                            title: "Enter your Password",
                            name: "4",
                            min: 6,
                            max: 32,
                            regex: null,
                            required: true
                        },
                        {
                            type: QuestionTypes.LABEL,
                            title: "Enter your Sentence",
                            name: "5",
                        },
                        {
                            type: QuestionTypes.TEXTAREA,
                            title: "Enter your Password",
                            name: "6",
                            min: 6,
                            max: 32,
                            regex: null,
                            required: true
                        },
                    ]
                },
                {
                    name: "Section 2",
                    elements: []
                },
                {
                    name: "Section 3",
                    elements: [
                        {
                            type: QuestionTypes.CHECKBOX_LIST,
                            name: "xxwqeocwoqwxwqe",
                            title: "Checkbox List title",
                            checkedInputs: [],
                            elements: [
                                {
                                    type: QuestionTypes.CHECKBOX,
                                    name: "ciwq4cee",
                                    title: "Checkbox 1",
                                },
                                {
                                    type: QuestionTypes.CHECKBOX,
                                    name: "ciwq4cedewqe",
                                    title: "Checkbox 2",
                                },
                            ]
                        },
                        {
                            type: QuestionTypes.RADIOBOX_LIST,
                            name: "xxwqeoccheckwoe",
                            title: "Radiobox List title",
                            checkedInput: "ciwq4ceeaa",
                            elements: [
                                {
                                    type: QuestionTypes.RADIOBOX,
                                    name: "ciwq4ceeaa",
                                    title: "Radiobox 1",
                                },
                                {
                                    type: QuestionTypes.RADIOBOX,
                                    name: "ciwq4cedewqcdae",
                                    title: "Radiobox 2",
                                },
                            ]
                        },
                        {
                            type: QuestionTypes.LISTS_LIST,
                            name: "xxwqeocwoe",
                            title: "Lists List title",
                            elements: [
                                {
                                    name: "list-wexqiwaeuv",
                                    title: "List 1 @ Lists List",
                                    type: QuestionTypes.CHECKBOX_LIST,
                                    checkedInputs: [],
                                    elements: [
                                        {
                                            type: QuestionTypes.CHECKBOX,
                                            name: "wexqiwaeuv",
                                            title: "Checkbox 1",
                                        },  
                                        {
                                            type: QuestionTypes.CHECKBOX,
                                            name: "Ssxqiw231uUeuv",
                                            title: "Checkbox 2",
                                        },

                                    ]
                                },
                                {
                                    name: "list-ajwrvnb9ur",
                                    title: "List 2 @ Lists List",
                                    type: QuestionTypes.RADIOBOX_LIST,
                                    checkedInput: null,
                                    elements: [
                                        {
                                            type: QuestionTypes.RADIOBOX,
                                            name: "ajwrvnb9ur",
                                            title: "Radiobox 1",
                                        },  
                                        {
                                            type: QuestionTypes.RADIOBOX,
                                            name: "cur4Xasnrsvb",
                                            title: "Radiobox 2",
                                        },

                                    ]
                                }
                            ]
                        },
                    ]
                }
            ],
            // page 2
            [
                // section 1
                {
                    name: "Section 4",
                    elements: [
                        {
                            type: QuestionTypes.LABEL,
                            name: "7",
                            title: "Ya still there?"
                        },
                        {
                            type: QuestionTypes.TEXT,
                            name: "8",
                            title: "What is your name?",
                            min: 3,
                            max: 16,
                            required: true,
                            regex: null
                        }
                    ]
                },
                {
                    name: "Section 5",
                    elements: [
                        {
                            type: QuestionTypes.LABEL,
                            name: "9",
                            title: "Ya still there?"
                        },
                        {
                            type: QuestionTypes.TEXT,
                            name: "10",
                            title: "What is your name?",
                            min: 3,
                            max: 16,
                            required: true,
                            regex: null
                        }
                    ]
                }
            ]      
        ]
    },
    {
        name: "Wizard 2.0",
        id: "X18HZ63YgX8hH01",
        pages: []
    },
]


// const wizardSchema = Joi.object({
//     name: Joi.string().required(),
//     title: Joi.string().min(2).max(300).required(),
//     pages: Joi.array([
//         {
//             title: Joi.string().required(),
//             sections: Joi.array([
//                 {
//                     title: Joi.string().min(2).required(),
//                     content: Joi.array([
//                             ...itemSchema
//                     ]).required()
//                 }
//         ]).required()
//         }
//     ])
// })

// const filledWizardSchema = Joi.object({
//     id: Joi.number().required(),
//     data: Joi.object({
//         pages: Joi.array([
//             {
//                 title: Joi.string().required(),
//                 sections: Joi.array([
//                     {
//                         title: Joi.string().min(2).required(),
//                         content: Joi.array([
//                                 ...filledItemSchema
//                         ]).required()
//                     }
//                 ]).required()
//             }
//         ]).required()
//     }).required()