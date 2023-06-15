const { FoodReview, User } = require('../models')

class FoodReviewController {
  static async read(req, res, next) {
    try {
      const foodReviews = await FoodReview.findAll({
        include: User
      })

      res.status(200).json(foodReviews)
    } catch (err) {
      next(err)
    }
  }

  static async readById(req, res, next) {
    try {
      const foodReviewToShow = await FoodReview.findOne({
        where: { id: req.params.id },
        include: User
      })

      if (!foodReviewToShow) {
        throw { code: 404, message: 'Food review not found' }
      }

      res.status(200).json(foodReviewToShow)
    } catch (err) {
      next(err)
    }
  }

  static async add(req, res, next) {
    try {
      const { name, address, phoneAddress, operationalHours, overview, latitude, longitude } = req.body

      const newFoodReview = await FoodReview.create({
        name,
        address,
        phoneAddress,
        operationalHours,
        overview,
        latitude,
        longitude,
        user_id: req.user.id
      })

      res.status(201).json(newFoodReview)
    } catch (err) {
      next(err)
    }
  }

  static async updateById(req, res, next) {
    try {
      const { name, address, phoneAddress, operationalHours, latitude, longitude, overview } = req.body

      await FoodReview.update({
        name,
        address,
        phoneAddress,
        operationalHours,
        overview,
        latitude,
        longitude,
        user_id: req.user.id
      },
        {
          where: {
            id: req.params.id
          }
        })

      res.status(201).json({
        message: 'Success to add update review'
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      await FoodReview.destroy({
        where: {
          id: req.params.id
        }
      })

      res.status(200).json({
        message: 'Success delete food review'
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = FoodReviewController