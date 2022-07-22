'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auteurs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
         allowNull: false,
        type: Sequelize.STRING
      },
      prenom: {
         allowNull: false,
        type: Sequelize.STRING
      },
      email: {
         allowNull: false,
        type: Sequelize.STRING
      },
      numero: {
         allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('auteurs');
  }
};