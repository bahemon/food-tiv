const express = require('express')
const RestaurantMenuController = require('../Controllers/RestaurantMenuController')
const authentication = require('../middlewares/authentication')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

router.get('/restaurantMenus/:foodReviewId', RestaurantMenuController.read)
router.post('/restaurantMenus/:foodReviewId', authentication, upload.single('imageUrl'), RestaurantMenuController.addMenu)

module.exports = router