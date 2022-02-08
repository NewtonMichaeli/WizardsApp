const jwt = require('jsonwebtoken')
const resHandler = require('../utils/responseHandler')

//handle Admin routes - check if token given, find the user, and check his role. put the result in req.isAdmin:
const isAdmin = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) {
        req.isAdmin = false
        return next()
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(verified.role === "Admin") {
            req.isAdmin = true
            return next()
        }
    }
    catch(err) {
        req.isAdmin = false
        return next()
    }
}

module.exports = isAdmin