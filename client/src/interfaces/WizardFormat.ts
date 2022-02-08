// Interfaces for Wizard structure formatting

import { Url } from "url"


// All Input types for a Wizard to have
interface InputTypes {
    "Label": {
        type: "Label",
        title: string,
        name: string
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
        regex: RegExp,
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
        type: "Image"
        url: Url,   // either 
    }
    "RadioboxList": {
        "type": "RadioboxList",
        "elements": InputTypes['Radiobox'][]
    },
    "CheckboxList": {
        "type": "CheckboxList",
        "elements": InputTypes['Checkbox'][]
    },
    "ListsList": {
        "type": "ListsList",
        "elements": (
            InputTypes['CheckboxList'] | InputTypes['RadioboxList']
        )[]
    }
}

// Wizards format
export type WizardsFormat = {
    name: string,
    id: string,
    isPrivate: boolean,
    pages: {
        section_name: string,
        order: number,
        elements: (
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
        )[]
    }[]
}[]


// export dummy wizard
export const fake_wizard: WizardsFormat = [
    {
        name: "Wizard 1.0",
        id: "j18cn63ng98hHi9",
        isPrivate: false,
        pages: [
            {
                section_name: "section-1",
                order: 1,
                elements: [
                    {
                        type: 'Checkbox',
                        title: "string",
                        name: "string",
                        alreadyChecked: true
                    }
                ]
            },
            {
                section_name: "section-2",
                order: 2,
                elements: [
                    {
                        type: "Label",
                        name: "name",
                        title: "What is your name?"
                    },
                    {
                        type: "Text",
                        name: "name",
                        title: "What is your name?",
                        min: 3,
                        max: 16,
                        required: true,
                        regex: null
                    }
                ]
           }       
        ]
    },
    {
        name: "Wizard 2.0",
        id: "j18HZ63YgX8hH01",
        isPrivate: true,
        pages: []
    },
]