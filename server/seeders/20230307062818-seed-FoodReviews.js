'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FoodReviews', require('../db/foodReviews.json').map(foodReview => {
      foodReview.createdAt = new Date()
      foodReview.updatedAt = new Date()
      return foodReview
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FoodReviews', null, {})
  }
};
