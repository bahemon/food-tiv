const express = require('express')
const router = express.Router()
const errorHandlers = require('../middlewares/errorHandlers')
const users = require('./users')
const categories = require('./categories')
const foodReviews = require('./foodReviews')
const restaurantMenus = require('./restaurantMenus')

router.use(users)
router.use(categories)
router.use(foodReviews)
router.use(restaurantMenus)

router.use(errorHandlers)

module.exports = router