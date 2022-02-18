// Interfaces for Wizard structure formatting

import { Url } from "url"


// All Input types for a Wizard to have
interface InputTypes {
    "Label": {
        type: "Label",
        title: string,
        name: string,
    },
    "Checkbox": {
        type: 'Checkbox',
        title: string,
        name: string,
        alreadyChecked: boolean
    },
    "Text": {
        type: "Text",
        title: string,
        name: string,
        regex: RegExp | null,
        required: boolean
        min: number,
        max: number
    },
    "Textarea": {
        type: "Textarea",
        title: string,
        name: string,
        regex: RegExp | null,
        required: boolean
        min: number,
        max: number
    },
    "Range": {
        type: "Range",
        title: string,
        name: string,
        required: boolean,
        min: number,
        max: number
    },
    "Radiobox": {
        type: "Radiobox",
        title: string,
        name: string,
        alreadyChecked: boolean
    },
    "SecuredInput": {
        type: "SecuredInput",
        title: string,
        name: string,
        regex: RegExp | null,
        required: boolean
        min: number,
        max: number
    },
    "Image": {
        name: string,
        type: "Image"
        title: string,
        url: Url,   // either 
    }
    "RadioboxList": {
        name: string,
        type: "RadioboxList",
        title: string,
        elements: InputTypes['Radiobox'][]
    },
    "CheckboxList": {
        name: string,
        type: "CheckboxList",
        title: string,
        elements: InputTypes['Checkbox'][]
    },
    "ListsList": {
        name: string,
        type: "ListsList",
        title: string,
        elements: (
            InputTypes['CheckboxList'] | InputTypes['RadioboxList']
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
    InputTypes['CheckboxList'] |
    InputTypes['RadioboxList'] |
    InputTypes['ListsList']

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
                            type: "Label",
                            title: "Hi",
                            name: "1",
                        },
                        {
                            type: 'Text',
                            title: "Enter your Name",
                            name: "2",
                            min: 6,
                            max: 32,
                            regex: null,
                            required: true
                        },
                        {
                            type: "Label",
                            title: "Hi Again",
                            name: "3",
                        },
                        {
                            type: 'SecuredInput',
                            title: "Enter your Password",
                            name: "4",
                            min: 6,
                            max: 32,
                            regex: null,
                            required: true
                        },
                        {
                            type: "Label",
                            title: "Enter your Sentence",
                            name: "5",
                        },
                        {
                            type: 'Textarea',
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
                    elements: []
                }
            ],
            // page 2
            [
                // section 1
                {
                    name: "Section 4",
                    elements: [
                        {
                            type: "Label",
                            name: "7",
                            title: "Ya still there?"
                        },
                        {
                            type: "Text",
                            name: "8",
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