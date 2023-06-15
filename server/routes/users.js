const express = require('express')
const UserController = require('../Controllers/UserController')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-sign-in', UserController.googleSignIn)
router.get('/profile', authentication, UserController.readProfile)
// change user role 
router.patch('/premiumMember', authentication, UserController.premiumMember)
// generate midtrans token
router.post('/generateMidtransToken', authentication, UserController.generateMidtransToken)

module.exports = router