const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const midtransClient = require('midtrans-client')
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber } = req.body

      if (!username) {
        throw { code: 400, message: 'Please input your username' }
      }

      if (!email) {
        throw { code: 400, message: 'Please input your email' }
      }

      if (!password) {
        throw { code: 400, message: 'Please input your password' }
      }

      if (!phoneNumber) {
        throw { code: 400, message: 'Please input your Phone Number' }
      }

      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber
      })

      res.status(201).json({
        id: newUser.id,
        email: newUser.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email) {
        throw { code: 400, message: 'Please input your email' }
      }

      if (!password) {
        throw { code: 400, message: 'Please input your password' }
      }

      const loggedInuser = await User.findOne({
        where: { email }
      })

      if (!loggedInuser) {
        throw { code: 401, message: 'Incorrect email or password' }
      }

      const isValidPassword = comparePassword(password, loggedInuser.password)

      if (!isValidPassword) {
        throw { code: 401, message: 'Incorrect email or password' }
      }

      const access_token = generateToken({
        id: loggedInuser.id,
        email: loggedInuser.email
      })

      res.status(200).json({
        access_token,
        id: loggedInuser.id,
        email: loggedInuser.email,
        phoneNumber: loggedInuser.phoneNumber,
        role: loggedInuser.role,
        username: loggedInuser.username
      })
    } catch (err) {
      next(err)
    }
  }

  static async googleSignIn(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.headers.token,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const payload = ticket.getPayload()

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: '123321',
          phoneNumber: '08808068'
        },
        hooks: false
      })

      const access_token = generateToken({
        id: user.id
      })

      res.status(200).json({
        access_token,
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        username: user.username
      })
    }
    verify().catch(console.error)
  }

  static async readProfile(req, res, next) {
    try {
      const userProfile = await User.findOne(
        {
          where: { id: req.user.id },
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
          }
        }
      )

      res.status(200).json(userProfile)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async premiumMember(req, res, next) {
    try {
      await User.update({
        role: 'Premium'
      },
        {
          where: { id: req.user.id }
        })

      res.status(200).json({
        message: `user role with id ${req.user.id} is now premium`
      })

    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async generateMidtransToken(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id)

      if (user.role === 'Premium') {
        throw { code: 400, message: 'your role is already premium' }
      }

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      })

      let parameter = {
        "transaction_details": {
          "order_id": 'FOODTIV_' + Math.floor(100000 + Math.random() * 900000), // must be unique
          "gross_amount": 15000
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          "username": user.username,
          "email": user.email,
          "phoneNumber": user.phoneNumber
        }
      }

      // transaction token
      const midtransToken = await snap.createTransaction(parameter)
      // console.log(midtransToken, '>><><><><><>')
      res.status(201).json(midtransToken)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController