const { User, FoodReview } = require('../models')

async function isFoodReviewer(req, res, next) {
  try {
    const foodReviewToAction = await FoodReview.findByPk(req.params.id)

    if (!foodReviewToAction) {
      throw { code: 404, message: 'Food review not found' }
    }

    if (foodReviewToAction.user_id !== req.user.id) {
      throw { code: 403, message: 'This food review is not yours' }
    } else {
      next()
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = isFoodReviewer