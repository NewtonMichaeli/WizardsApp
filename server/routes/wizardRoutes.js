const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const wizardController = require('../controllers/wizardController')
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

//delete wizard
router.delete('/:id', authMiddleware, wizardController.deleteWizard)

module.exports = router;
