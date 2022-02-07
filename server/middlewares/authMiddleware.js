const jwt = require('jsonwebtoken')
const resHandler = require('../utils/responseHandler')

//handle private routes - check if token given, find the user, and put his id in req.body
const auth = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return resHandler.accessDeniedErr(res)

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = {
            _id: verified._id,
            role: verified.role
        }
        next()
    }
    catch(err) {
        return resHandler.accessDeniedErr(res)
    }
}

module.exports = auth