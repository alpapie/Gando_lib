'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ecrits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aut_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'auteurs',
          key: 'id'
        }
      },
      doc_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'documents',
          key: 'id'
        }
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
    await queryInterface.dropTable('ecrits');
  }
};