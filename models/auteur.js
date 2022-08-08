'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auteur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      auteur.hasMany(models.admin,{
        foreignKey: "aut_id"
      })
    }
  }
  auteur.init({
    nom: DataTypes.STRING,
    email: DataTypes.STRING,
    numero: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'auteur',
  });
  return auteur;
};