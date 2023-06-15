const { decodedToken } = require('../helpers/jwt')
const { User, FoodReview } = require('../models')

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.access_token

    if (!access_token) {
      throw { code: 401, message: 'Invalid Token' }
    }

    const payload = decodedToken(access_token)

    const findUser = await User.findByPk(payload.id)

    if (!findUser) {
      throw { code: 401, message: 'Invalid Token' }
    }

    req.user = {
      id: findUser.id,
      email: findUser.email
    }

    next()
  } catch (err) {
    next(err)
  }

}


module.exports = authentication