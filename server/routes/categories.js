const express = require('express')
const CategoryController = require('../Controllers/CategoryController')
const router = express.Router()

router.get('/categories', CategoryController.read)

module.exports = router