const resHandler = require('../utils/responseHandler')
const {wizardSchema, filledWizardSchema} = require('../validations/wizardSchema')
const wizardRequests = require('../db/requestsHandler/wizardRequests')

const createWizard = async (req, res) => {

    //data extracting
    let wizard = req.body
    const {user} = req

    //continue only if the role is wizardCreator or admin
    if(!(req.user.role === "admin" || req.user.role === "wizardCreator")) return resHandler.accessDeniedErr(res)

    //fields validation
    const {error} = wizardSchema.validate(wizard)
    if(error) return resHandler.fieldsErr(res, error.details[0].message)

    //upload wizard
    const result = await wizardRequests.createWizard(wizard, user.id)
    if(!result) return resHandler.internalServerErr(res)
    return resHandler.wizardCreatedSuccessfuly(res, result)
}

const deleteWizard = async (req, res) => {

    //data extracting
    const {id, role} = req.user
    const {id: wizardId} = req.params

    //continue only if it's your wizard, or if you're the admin.
    const wizard = await wizardRequests.getWizard(wizardId)
    if(!wizard) return resHandler.wizardNotFoundErr(res)
    
    // Validate user
    const isCreator = wizard.createdBy === id.toString()
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
    
    const isCreator = wizard.createdBy === id.toString()
    if(!(isCreator || role === "admin")) return resHandler.accessDeniedErr(res)

    console.log(wizardId, newWizard);
    //update the wizard
    const result = await wizardRequests.updateWizard(wizardId, newWizard)
    if(!result) return resHandler.internalServerErr(res)
    return resHandler.wizardDeletedSuccessfuly(res)
}

const fillWizard = async (req, res) => {
    
    //data extracting
    const {role} = req.user
    const {wizardId, filledWizard} = req.body

    //continue only if you're user
    if(!(role === "user")) return resHandler.accessDeniedErr(res)

    //fields validation
    const {error} = filledWizardSchema.validate(filledWizard)
    if(error) return resHandler.fieldsErr(res, error.details[0].message)
    
    //upload to db
    const result = await wizardRequests.fillWizard(wizardId, filledWizard)
    if(!result) return resHandler.wizardFilledSuccessfuly(res)

}

const getWizard = async (req, res) => {
    
    //data extracting
    const { id: wizardId } = req.params
    
    //get the wizard
    const wizard = await wizardRequests.getWizard(wizardId)
    console.log(wizard)
    if(!wizard) return resHandler.wizardNotFoundErr(res)

    return resHandler.wizardSentSuccessfuly(res, wizard)
}


const getWizards = async (req, res) => {
    
    //data extracting
    const {role, id} = req.user
    let wizards

    //get the wizards
    if(role === "admin") wizards = await wizardRequests.getWizards()
    else wizards = await wizardRequests.getWizardsById(id)  // [wizard1, wizard2, etc..]
    
    // return wizards-array
    return resHandler.wizardSentSuccessfuly(res, wizards)
}

module.exports = {getWizard, getWizards, createWizard, deleteWizard, updateWizard, fillWizard}