'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FoodReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FoodReview.belongsTo(models.User, { foreignKey: 'user_id' })
      FoodReview.hasMany(models.RestaurantMenu, { foreignKey: 'foodReview_id' })
    }
  }
  FoodReview.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'restaurant name cannot be empty'
        },
        notNull: {
          msg: 'restaurant name cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'restaurant address cannot be empty'
        },
        notNull: {
          msg: 'restaurant address cannot be empty'
        }
      }
    },
    operationalHours: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'operational hours cannot be empty'
        },
        notNull: {
          msg: 'operational hours cannot be empty'
        }
      }
    },
    phoneAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'phone address cannot be empty'
        },
        notNull: {
          msg: 'phone address cannot be empty'
        }
      }
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'overview cannot be empty'
        },
        notNull: {
          msg: 'overview cannot be empty'
        }
      }
    },
    latitude: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'latitude cannot be empty'
        },
        notNull: {
          msg: 'latitude cannot be empty'
        }
      }
    },
    longitude: {
      type: DataTypes.NUMERIC,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'longitude cannot be empty'
        },
        notNull: {
          msg: 'longitude cannot be empty'
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
    modelName: 'FoodReview',
  });
  return FoodReview;
};