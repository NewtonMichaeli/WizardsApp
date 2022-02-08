const Joi = require('@hapi/joi')

const validTypes = ["Label", "Checkbox", "Text", "Number", "TextArea", "Range",
"RadioBox", "SecuredInput", "Image", "RadioBoxList", "CheckBoxList", "ListsList"]

const itemSchema = {
    type: Joi.string.valid(validTypes).required(),
    title: Joi.string.min(2).max(300).required(),
    name: Joi.string.required(),
    regex: Joi.string(),
    range: Joi.number(),
    min: Joi.number(),
    max: Joi.number(),
    required: Joi.boolean(),
    checked: Joi.boolean()
}

const wizardSchema = Joi.object({
    name: Joi.string.required(),
    title: Joi.string.min(2).max(300).required(),
    pages: Joi.array([
        {
            name: Joi.string().required(),
            sections: Joi.object({
                title: Joi.string().min(2).required(),
                content: Joi.array([
                    {
                        ...itemSchema,
                        elements: Joi.array[{...itemSchema}]
                    }
                ]).required()
            }).required()
        }
    ]).required()
})

module.exports = wizardSchema