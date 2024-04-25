const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Module extends Model { }

  Module.init({
    ModuleID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(1048),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Module',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Module;
};
