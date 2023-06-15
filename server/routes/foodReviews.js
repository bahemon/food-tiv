const express = require('express')
const FoodReviewController = require('../Controllers/FoodReviewController')
const authentication = require('../middlewares/authentication')
const isFoodReviewer = require('../middlewares/isFoodReviewer')
const router = express.Router()

router.get('/foodReviews', FoodReviewController.read)
router.post('/foodReviews', authentication, FoodReviewController.add)
router.get('/foodReviews/:id', FoodReviewController.readById)
router.put('/foodReviews/:id', authentication, isFoodReviewer, FoodReviewController.updateById)
router.delete('/foodReviews/:id', authentication, isFoodReviewer, FoodReviewController.delete)

module.exports = router