'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RestaurantMenus', require('../db/restaurantMenus.json').map(restaurantMenu => {
      restaurantMenu.createdAt = new Date()
      restaurantMenu.updatedAt = new Date()
      return restaurantMenu
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RestaurantMenus', null, {})
  }
};
