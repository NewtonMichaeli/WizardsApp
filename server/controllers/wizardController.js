const resHandler = require('../utils/responseHandler')
const {wizardSchema, filledWizardSchema} = require('../validations/wizardSchema')

const createWizard = async (req, res) => {

    //data extracting
    let {wizard} = req.body
    const {user} = req

    //continue only if the role is wizardCreator or admin
    if(!(req.user.role === "admin" || req.user.role === "wizardCreator")) return resHandler.accessDeniedErr(res)

    //fields validation
    const {error} = wizardSchema.validate(wizard)
    if(error) return resHandler.fieldsErr(res, error.details[0].message)

    //upload wizard
    const result = await wizardRequests.createWizard(wizard, user.id)
    if(!result) return resHandler.internalServerErr(res)
    return resHandler.wizardCreatedSuccessfuly(res)
}

const deleteWizard = async (req, res) => {

    //data extracting
    const {id, role} = req.user
    const {wizardId} = req.body

    //continue only if it's your wizard, or if you're the admin.
    const wizard = await wizardRequests.getWizard(wizardId)
    if(!wizard) return resHandler.wizardNotFoundErr(res)
    
    const isCreator = wizard.creator === id
    if(!(isCreator || role === "admin")) return resHandler.accessDeniedErr(res)
    
    //delete the wizard
    const result = await wizardRequests.deleteWizard(wizardId)
    if(!result) return resHandler.internalServerErr(res)
    return resHandler.wizardDeletedSuccessfuly(res)
}

const updateWizard = async (req, res) => {

    //data extracting
    const {id, role} = req.user
    const {wizardId, newWizard} = req.body

    //continue only if it's your wizard, or if you're the admin.
    const wizard = await wizardRequests.getWizard(wizardId)
    if(!wizard) return resHandler.wizardNotFoundErr(res)
    
    const isCreator = wizard.creator === id
    if(!(isCreator || role === "admin")) return resHandler.accessDeniedErr(res)

    //update the wizard
    const result = await wizardRequests.deleteWizard(wizardId, newWizard)
    if(!result) return resHandler.internalServerErr(res)
    return resHandler.wizardDeletedSuccessfuly(res)
}

const fillWizard = async (req, res) => {
    
    //data extracting
    const {id, role} = req.user
    const {wizardId, filledWizard} = req.body

    //continue only if you're user
    if(!(role === "user")) return resHandler.accessDeniedErr(res)

    //fields validation
    const {error} = filledWizardSchema.validate(filledWizard)
    if(error) return resHandler.fieldsErr(res, error.details[0].message)
    
    //upload to db
    const result = await wizardRequests.fillWizard(id, wizardId, filledWizard)
    if(!result) return resHandler.wizardFilledSuccessfuly(res)

}

const getWizard = async (req, res) => {

    let fullAccess = false
    
    //data extracting
    const {role} = req.user
    const {wizardId} = req.body
    
    //get the wizard
    const wizard = await wizardRequests.getWizard(wizardId)
    if(!wizard) return resHandler.wizardNotFoundErr(res)

    //check if you're the creator or the admin - have full access
    const isCreator = wizard.creator === id
    if(isCreator || role === "admin") fullAccess = true
    
    if(fullAccess) return resHandler.wizardSentSuccessfuly(res, wizard)
    return resHandler.wizardSentSuccessfuly(res, wizard.content)
}

module.exports = {getWizard, createWizard, deleteWizard, updateWizard, fillWizard}