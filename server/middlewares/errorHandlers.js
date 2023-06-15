const multer = require('multer')

function errorHandlers(err, req, res, next) {
  console.log(err)
  if (err.hasOwnProperty('code')) {
    res.status(err.code).json({
      message: err.message
    })
  } else if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message: err.errors[0].message
    })
  } else if (err.name === 'MidtransError') {
    res.status(400).json({
      message: err.ApiResponse.error_messages[0]
    })
  } else {
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

module.exports = errorHandlers