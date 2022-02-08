const router = require('express').Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdminMiddleware')

router.post('/signup', isAdmin, authController.signup)

router.post('/signin', authController.signin)

router.patch('/', [isAdmin, authMiddleware], authController.updateDetails)

router.get('/', authMiddleware, authController.getUserDetails)

router.delete('/', authMiddleware, authController.deleteUser)

module.exports = router;
