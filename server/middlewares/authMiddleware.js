const jwt = require('jsonwebtoken')
const resHandler = require('../utils/responseHandler')
const authRequests = require('../db/requestsHandler/authRequests')

//handle private routes - check if token given, find the user, and put his id in req.body
const auth = async (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(400).send("stage 1")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        const result = await authRequests.getUserById(verified.id)
        if(!result) return resHandler.internalServerErr(res)

        req.user = result
        return next()
    }
    catch(err) {
        return res.status(400).send("stage 2")
    }
}

module.exports = auth