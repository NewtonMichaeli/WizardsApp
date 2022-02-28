// Interfaces for Wizard structure formatting

import { Url } from "url"
import { QuestionTypes, ServerResultsType } from "../redux/types"
import { WizardServerFormFormat } from "./WizardFormat_Server"


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
    "Number": {
        type: QuestionTypes.NUMBER,
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
    InputTypes['Number'] |
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


// Valid Answer struct
export const fake_server_answer: ServerResultsType[] = 
[
    {
        username: 'username1',
        email: 'username1@gmail.com',
        results: {
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
                                name: "aaa",
                            },
                            {
                                type: QuestionTypes.TEXT,
                                name: "2",
                                value: "bbb"
                            },
                            {
                                type: QuestionTypes.LABEL,
                                name: "ccc",
                            },
                            {
                                type: QuestionTypes.SECURED_INPUT,
                                name: "ddd",
                                value: ""
                            },
                            {
                                type: QuestionTypes.LABEL,
                                name: "eee",
                            },
                            {
                                type: QuestionTypes.TEXTAREA,
                                name: "6",
                                value: ""
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
                                checkedElements: ["xoZerpxqixwq2"],
                            },
                            {
                                type: QuestionTypes.RADIOBOX_LIST,
                                name: "xxwqeoccheckwoe",
                                checkedElement: "ciwq4ceeaa",
                            },
                            {
                                type: QuestionTypes.LISTS_LIST,
                                name: "xxwqeocwoe",
                                elements: [
                                    {
                                        name: "list-wexqiwaeuv",
                                        type: QuestionTypes.CHECKBOX_LIST,
                                        checkedElements: []
                                    },
                                    {
                                        name: "list-ajwrvnb9ur",
                                        type: QuestionTypes.RADIOBOX_LIST,
                                        checkedElement: ""
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
                                name: "7"
                            },
                            {
                                type: QuestionTypes.TEXT,
                                name: "8",
                                value: ""
                            }
                        ]
                    },
                    {
                        name: "Section 5",
                        elements: [
                            {
                                type: QuestionTypes.LABEL,
                                name: "9"
                            },
                            {
                                type: QuestionTypes.TEXT,
                                name: "10",
                                value: ""
                            }
                        ]
                    }
                ]      
            ]
        }
    }
]
