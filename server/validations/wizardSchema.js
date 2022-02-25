const Joi = require('@hapi/joi')

const filledItemSchema = Joi.object().valid(
{
    type: Joi.string().valid("Label").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required()
},
{
    type: Joi.string().valid("Checkbox").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required()
},
{
    type: Joi.string().valid("Text").required(),
    title: Joi.string().min(2).max(300).required(),
    value: Joi.string().required()
},
{
    type: Joi.string().valid("Number").required(),
    title: Joi.string().min(2).max(300).required(),
    value: Joi.number().required()
},
{
    type: Joi.string().valid("TextArea").required(),
    title: Joi.string().min(2).max(300).required(),
    value: Joi.string().required()
},
{
    type: Joi.string().valid("Range").required(),
    title: Joi.string().min(2).max(300).required(),
    value: Joi.number()
},
{
    type: Joi.string().valid("RadioBox").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required()
},
{
    type: Joi.string().valid("SecuredInput").required(),
    title: Joi.string().min(2).max(300).required(),
    value: Joi.string().required()
},
{
    type: Joi.string().valid("Image").required(),
    title: Joi.string().min(2).max(300).required(),
    value: Joi.string()
},
{
    type: Joi.string().valid("RadioBoxList").required(),
    title: Joi.string().min(2).max(300).required(),
    checkedInput: Joi.string(),
    elements: Joi.array([
        {
            type: Joi.string().valid("RadioBox").required(),
            title: Joi.string().min(2).max(300).required(),
            name: Joi.string().required()
        }
    ]).required()
},
{
    type: Joi.string().valid("CheckBoxList").required(),
    title: Joi.string().min(2).max(300).required(),
    checkedInputs: Joi.array(),
    name: Joi.string().required(),
    required: Joi.boolean(),
    elements: Joi.array([
        {
            type: Joi.string().valid("Checkbox").required(),
            title: Joi.string().min(2).max(300).required(),
            name: Joi.string().required()
        }
    ]).required()
})


const itemSchema = Joi.object().valid(
{
    type: Joi.string().valid("Label").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required()
    
},
{
    type: Joi.string().valid("Checkbox").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    required: Joi.boolean()
}, 
{
    type: Joi.string().valid("Text").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    regex: Joi.string(),
    min: Joi.number(),
    max: Joi.number(),
    required: Joi.boolean()
},
{
    type: Joi.string().valid("Number").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    range: Joi.number(),
    required: Joi.boolean()
},
{
    type: Joi.string().valid("TextArea").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    regex: Joi.string(),
    min: Joi.number(),
    max: Joi.number(),
    required: Joi.boolean(),
},
{
    type: Joi.string().valid("Number").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    range: Joi.number(),
    required: Joi.boolean()
},
{
    type: Joi.string().valid("RadioBox").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    required: Joi.boolean()
},
{
    type: Joi.string().valid("SecuredInput").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    regex: Joi.string(),
    min: Joi.number(),
    max: Joi.number(),
    required: Joi.boolean()
},
{
    type: Joi.string().valid("Image").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    src: Joi.string().required()
},
{
    type: Joi.string().valid("RadioBoxList").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    required: Joi.boolean(),
    elements: Joi.array([
        {
            type: Joi.string().valid("RadioBox").required(),
            title: Joi.string().min(2).max(300).required(),
            name: Joi.string().required(),
            checked: Joi.boolean()
        }
    ]).required()
},
{
    type: Joi.string().valid("CheckBoxList").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    required: Joi.boolean(),
    elements: Joi.array([
        {
            type: Joi.string().valid("CheckBox").required(),
            title: Joi.string().min(2).max(300).required(),
            name: Joi.string().required(),
            checked: Joi.boolean()
        }
    ]).required()
})


const wizardSchema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().min(2).max(300).required(),
    pages: Joi.array([
        {
            title: Joi.string().required(),
            sections: Joi.array([
                {
                    title: Joi.string().min(2).required(),
                    content: Joi.array([
                            ...itemSchema
                    ]).required()
                }
        ]).required()
        }
    ])
})

const filledWizardSchema = Joi.object({
    id: Joi.number().required(),
    data: Joi.object({
        pages: Joi.array([
            {
                title: Joi.string().required(),
                sections: Joi.array([
                    {
                        title: Joi.string().min(2).required(),
                        content: Joi.array([
                                ...filledItemSchema
                        ]).required()
                    }
                ]).required()
            }
        ]).required()
    }).required()
})
module.exports = {wizardSchema, filledWizardSchema}