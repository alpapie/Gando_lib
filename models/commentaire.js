'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      commentaire.belongsTo(models.user, {
      foreignKey: 'user_id'
      }),

      commentaire.belongsTo(models.document, {
      foreignKey: 'doc_id'
    })
    
    }
  }
  commentaire.init({
    user_id: DataTypes.INTEGER,
    doc_id: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'commentaire',
  });
  return commentaire;
};