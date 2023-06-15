'use strict';
const {
  Model
} = require('sequelize');
const { generateHashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.FoodReview, { foreignKey: 'user_id' })
      User.hasMany(models.RestaurantMenu, { foreignKey: 'user_id' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'username cannot be empty'
        },
        notNull: {
          msg: 'username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty'
        },
        notNull: {
          msg: 'email cannot be empty'
        },
        isEmail: {
          msg: 'wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty'
        },
        notNull: {
          msg: 'password cannot be empty'
        },
        len: {
          args: [5],
          msg: "Password minimum character is 5!"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'phone number cannot be empty'
        },
        notNull: {
          msg: 'phone number cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Inactive'
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Basic'
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((User, options) => {
    User.password = generateHashPassword(User.password)
  })
  return User;
};