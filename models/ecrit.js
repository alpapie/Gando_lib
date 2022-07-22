'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ecrit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      ecrit.belongsTo(models.auteur, {
        foreignKey: 'aut_id'
    }),

   ecrit.belongsTo(models.document, {
       foreignKey: 'doc_id'
    })

    }
  }
  ecrit.init({
    aut_id: DataTypes.INTEGER,
    doc_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ecrit',
  });
  return ecrit;
};