const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdminMiddleware')

router.post('/signup', isAdmin, authController.signup)

router.post('/signin', authController.signin)

router.patch('/', authController.updateDetails)

router.get('/', authMiddleware, authController.getUserDetails)

module.exports = router;