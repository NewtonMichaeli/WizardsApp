const authRequests = require('../db/requestsHandler/authRequests')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resHandler = require('../utils/responseHandler')
const { signinSchema, signupSchema, updateDetailsSchema } = require('../validations/authSchema')

const signup = async (req, res) => {

    //data extracting
    let {email, password, name, role} = req.body

    //fields validation
    const {error} = signupSchema.validate(req.body)
    if(error) return resHandler.fieldsErr(res, error.details[0].message)

    //check role
    role = req.isAdmin ? role : "admin"

    //pass hashing
    password = await bcrypt.hash(password, 10)

    //user creating
    const result = await authRequests.createUser({email, password, name, role})
    if(!result) return resHandler.internalServerErr(res)

    //get user data
    const userData = await authRequests.getUserByEmail(email)
    if(!userData) return resHandler.internalServerErr(res)

    //jwt wrapping
    const token = jwt.sign(JSON.stringify(result), process.env.TOKEN_SECRET)
    if(!token) return resHandler.internalServerErr(res)

    //return the token
    if(token) return resHandler.userCreatedSuccessfuly(res, token)
}

const signin = async (req, res) => {

    //data extracting
    let {email, password} = req.body
    
    //fields validation
    const {error} = signinSchema.validate(req.body)
    if(error) return resHandler.fieldsErr(res, error.details[0].message)

    //db request
    const result = await authRequests.getUserByEmail(email)
    if(!result) return resHandler.emailPassIncorrectErr(res)

    //matching passwords
    const match = await bcrypt.compare(password, result.password)
    if(!match) return resHandler.emailPassIncorrectErr(res)

    //generate token
    const token = jwt.sign(JSON.stringify(result), process.env.TOKEN_SECRET)
    return resHandler.loggedInSuccessfuly(res, token)
}

const getUserDetails = async (req, res) => {
    
    //return it
    return resHandler.userSentSuccessfuly(res, req.user)
}

const deleteUser = async (req, res) => {

    //delete the wizard & error handling
    const result = await authRequests.deleteUser(req.user.id)
    if(result) return resHandler.userDeletedSuccessfuly(res)
    return resHandler.internalServerErr(res)
}

const updateDetails = async (req, res) => {

    //data extracting
    const {name, password, email} = req.body

    //fields validation
    const {error} = updateDetailsSchema.validate(req.body)
    if(error) return resHandler.fieldsErr(res, error.details[0].message)

    //pass hashing
    if(password) password = await bcrypt.hash(password, 10)

    //organize everything
    const newUser = {
        name: name ? name : req.user.name,
        password: password ? hashedPassword : req.user.password,
        email: email ? email : req.user.email,
        role: role ? req.isAdmin && role : req.user.role
    }

    //db request
    const result = authRequests.updateUser(newUser, req.user.id)
    if(!result) return resHandler.internalServerErr(res)
    return resHandler.userUpdatedSuccessfuly(res)
}



module.exports  = {signup, deleteUser, signin, getUserDetails, updateDetails}