const { RestaurantMenu, FoodReview, User, Category } = require('../models')

class RestaurantMenuController {
  static async read(req, res, next) {
    try {
      const restaurantMenusToShow = await RestaurantMenu.findAll({
        where: {
          foodReview_id: req.params.foodReviewId
        },
        include: [{
          model: Category
        }, {
          model: FoodReview,
          include: {
            model: User,
            attributes: {
              exclude: ['password', 'createdAt', 'updatedAt']
            }
          }
        }]
      })
      res.status(200).json(restaurantMenusToShow)
    } catch (err) {
      next(err)
    }
  }

  static async addMenu(req, res, next) {
    try {

      const { name, price, category_id } = req.body

      if (!name) {
        throw { code: 400, message: 'Menu name cannot be empty' }
      }
      if (!price) {
        throw { code: 400, message: 'Menu price cannot be empty' }
      }
      if (!category_id) {
        throw { code: 400, message: 'Menu category id cannot be empty' }
      }

      await RestaurantMenu.create({
        name,
        price,
        imageUrl: req.file.path.slice(req.file.path.indexOf('uploads')),
        category_id,
        foodReview_id: req.params.foodReviewId,
        user_id: req.user.id
      })

      res.status(200).json({
        message: 'Menu added to foodReview'
      })
    } catch (err) {
      next(err)
    }
  }
}


module.exports = RestaurantMenuController