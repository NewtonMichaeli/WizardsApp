const Joi = require('@hapi/joi')

const filledItemSchema = Joi.object().valid(
{
    name: Joi.string().required(),
    type: Joi.string().valid("Label").required(),
    // title: Joi.string().min(2).max(300).required(),
},
{
    name: Joi.string().required(),
    type: Joi.string().valid("Checkbox").required(),
    // title: Joi.string().min(2).max(300).required(),
},
{
    name: Joi.string().required(),
    type: Joi.string().valid("Text").required(),
    // title: Joi.string().min(2).max(300).required(),
    value: Joi.string().required()
},
{
    name: Joi.string().required(),
    type: Joi.string().valid("Number").required(),
    // title: Joi.string().min(2).max(300).required(),
    value: Joi.number().required()
},
{
    name: Joi.string().required(),
    type: Joi.string().valid("Textarea").required(),
    // title: Joi.string().min(2).max(300).required(),
    value: Joi.string().required()
},
// {
//     name: Joi.string().required(),
//     type: Joi.string().valid("Range").required(),
//     title: Joi.string().min(2).max(300).required(),
//     value: Joi.number()
// },
{
    name: Joi.string().required(),
    type: Joi.string().valid("Radiobox").required(),
    // title: Joi.string().min(2).max(300).required(),
},
{
    name: Joi.string().required(),
    type: Joi.string().valid("SecuredInput").required(),
    // title: Joi.string().min(2).max(300).required(),
    value: Joi.string().required()
},
{
    name: Joi.string().required(),
    type: Joi.string().valid("Image").required(),
    // title: Joi.string().min(2).max(300).required(),
    value: Joi.string()
},
{
    name: Joi.string().required(),
    type: Joi.string().valid("Radiobox List").required(),
    // title: Joi.string().min(2).max(300).required(),
    checkedElement: Joi.string(),
    // elements: Joi.array().items(
    //     {
    //         type: Joi.string().valid("RadioBox").required(),
    //         title: Joi.string().min(2).max(300).required(),
    //         name: Joi.string().required()
    //     }
    // ).required()
},
{
    type: Joi.string().valid("Checkbox List").required(),
    name: Joi.string().required(),
    // title: Joi.string().min(2).max(300).required(),
    checkedElements: Joi.array(),
    // required: Joi.boolean(),
    // elements: Joi.array().items(
    //     {
    //         type: Joi.string().valid("Checkbox").required(),
    //         title: Joi.string().min(2).max(300).required(),
    //         name: Joi.string().required()
    //     }
    // ).required()
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
    type: Joi.string().valid("Textarea").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    regex: Joi.string(),
    min: Joi.number(),
    max: Joi.number(),
    required: Joi.boolean(),
},
// {
//     type: Joi.string().valid("Number").required(),
//     title: Joi.string().min(2).max(300).required(),
//     name: Joi.string().required(),
//     range: Joi.number(),
//     required: Joi.boolean()
// },
{
    type: Joi.string().valid("Radiobox").required(),
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
    type: Joi.string().valid("Radiobox List").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    required: Joi.boolean(),
    elements: Joi.array().items(
        {
            type: Joi.string().valid("Radiobox").required(),
            title: Joi.string().min(2).max(300).required(),
            name: Joi.string().required(),
            checked: Joi.boolean()
        }
    ).required()
},
{
    type: Joi.string().valid("Checkbox List").required(),
    title: Joi.string().min(2).max(300).required(),
    name: Joi.string().required(),
    required: Joi.boolean(),
    elements: Joi.array().items(
        {
            type: Joi.string().valid("Checkbox").required(),
            title: Joi.string().min(2).max(300).required(),
            name: Joi.string().required(),
            checked: Joi.boolean()
        }
    ).required()
})


const wizardSchema = Joi.object({
    name: Joi.string().required(),
    pages: Joi.array().items(
        {
            sections: Joi.array().items(
                {
                    title: Joi.string().min(2).required(),
                    elements: Joi.array().items(
                            itemSchema
                    )
                }
        )
        }
    )
})

// v1
// const filledWizardSchema = Joi.object({
//     id: Joi.number().required(),
//     data: Joi.object({
//         pages: Joi.array().items(
//             {
//                 sections: Joi.array().items(
//                     {
//                         title: Joi.string().min(2).required(),
//                         elements: Joi.array().items(
//                                 filledItemSchema
//                         )
//                     }
//                 )
//             }
//         ).required()
//     }).required()
// })

// v2
const filledWizardSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    data: Joi.array().items(filledItemSchema).required()
})

module.exports = {wizardSchema, filledWizardSchema}