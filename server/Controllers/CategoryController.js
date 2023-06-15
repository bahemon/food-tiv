const { Category } = require('../models')

class CategoryController {
  static async read(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      res.status(200).json(categories)
    } catch (err) {
      next(err)
    }
  }
}


module.exports = CategoryController