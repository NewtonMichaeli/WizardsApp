const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdminMiddleware')

//create new wizard
router.post('/create', authMiddleware, wizardController.createWizard)

//fill wizard
router.post('/:id/fill', authMiddleware, wizardController.fillWizard)

//update wizard
router.patch('/:id', authMiddleware, wizardController.updateWizard)

//get all wizards
router.get('/', authMiddleware, wizardController.getWizards)

//get spesific wizard
router.get('/:id', authMiddleware, wizardController.getWizard)

//get spesific wizard results
router.get('/:id/results', authMiddleware, wizardController.getWizardResults)

//delete wizard
router.delete('/:id', authMiddleware, wizardController.deleteWizard)

module.exports = router;
