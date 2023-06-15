'use strict';

const { generateHashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', require('../db/users.json').map(user => {
      user.createdAt = new Date()
      user.updatedAt = new Date()
      user.password = generateHashPassword(user.password)
      return user
    }))
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
