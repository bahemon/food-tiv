'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RestaurantMenu.belongsTo(models.Category, { foreignKey: 'category_id' })
      RestaurantMenu.belongsTo(models.User, { foreignKey: 'user_id' })
      RestaurantMenu.belongsTo(models.FoodReview, { foreignKey: 'foodReview_id' })
    }
  }
  RestaurantMenu.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'menu name cannot be empty'
        },
        notNull: {
          msg: 'menu name cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'price cannot be empty'
        },
        notNull: {
          msg: 'price cannot be empty'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'image url cannot be empty'
        },
        notNull: {
          msg: 'image url cannot be empty'
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'category id cannot be empty'
        },
        notNull: {
          msg: 'category id cannot be empty'
        }
      }
    },
    foodReview_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'foodReview id cannot be empty'
        },
        notNull: {
          msg: 'foodReview id cannot be empty'
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'user id cannot be empty'
        },
        notNull: {
          msg: 'user id cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'RestaurantMenu',
  });
  return RestaurantMenu;
};