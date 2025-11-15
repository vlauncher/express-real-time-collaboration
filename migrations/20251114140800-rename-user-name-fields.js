'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename firstName to first_name
    await queryInterface.renameColumn('Users', 'firstName', 'first_name');
    
    // Rename lastName to last_name
    await queryInterface.renameColumn('Users', 'lastName', 'last_name');
  },

  down: async (queryInterface, Sequelize) => {
    // Revert back to camelCase
    await queryInterface.renameColumn('Users', 'first_name', 'firstName');
    await queryInterface.renameColumn('Users', 'last_name', 'lastName');
  }
};