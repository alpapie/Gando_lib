'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    
      document.hasMany(models.commentaire,{
        foreignKey: "doc_id",
        onDelete: 'CASCADE',
        hooks: true
      }),

      // models.document.hasMany(models.ecrit)
      document.hasMany(models.ecrit,{
        foreignKey: "doc_id",
        onDelete: 'CASCADE',
        hooks: true
      }),
      
      document.belongsTo(models.user, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        hooks: true
    })
    }
  }
  document.init({
    user_id: DataTypes.INTEGER,
    titre: DataTypes.STRING,
    description: DataTypes.STRING,
    langue: DataTypes.STRING,
    annee: DataTypes.DATE,
    editeur: DataTypes.STRING,
    page: DataTypes.INTEGER,
    fichier: DataTypes.STRING,
    isbn10: DataTypes.STRING,
    type: DataTypes.ENUM('livre','article'),
    category: DataTypes.STRING,
    thumb: DataTypes.STRING,
    note: DataTypes.STRING,
    size: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'document',
  });
  return document;
};