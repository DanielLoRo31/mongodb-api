const express = require('express');
const router = express.Router()
const userController = require('../controllers/userControllerMongo')


router.get('/', userController.get);

router.get('/:id', userController.getById)

router.get('/role/:role', userController.getByRole)

router.post('/', userController.post)

router.patch('/:id', userController.patch)

router.delete('/:id', userController.delete)


module.exports = router;