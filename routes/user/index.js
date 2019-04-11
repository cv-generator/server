const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authenticate = require('../../middlewares/authenticate')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/verify', authenticate)

module.exports = router