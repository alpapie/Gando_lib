'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      langue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      annee: {
        allowNull: false,
        type: Sequelize.DATE
      },
      editeur: {
        allowNull: false,
        type: Sequelize.STRING
      },
      page: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fichier: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isbn10: {
        allowNull: true,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type:Sequelize.ENUM,
        values: ['livre', 'article']
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      thumb:{
        allowNull:true,
        type: Sequelize.STRING
      },
      size: {
        allowNull:true,
        type: Sequelize.INTEGER
      },
      note: {
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
    await queryInterface.dropTable('documents');
  }
};