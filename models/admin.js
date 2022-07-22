'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  admin.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    numero: DataTypes.STRING,
    adress: DataTypes.STRING,
    adress1: DataTypes.STRING,
    role:DataTypes.STRING,
    entreprise: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};