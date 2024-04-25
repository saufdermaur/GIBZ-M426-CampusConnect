const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ClassModuleJunction extends Model { }

  ClassModuleJunction.init({
    ClassModuleID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    ClassID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Class',
        key: 'ClassID',
      },
    },
    ModuleID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Module',
        key: 'ModuleID',
      },
    },
  }, {
    sequelize,
    modelName: 'ClassModuleJunction',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  ClassModuleJunction.associate = function (models) {
    ClassModuleJunction.belongsTo(models.Class, {
      foreignKey: 'ClassID',
      as: 'class'
    });
    ClassModuleJunction.belongsTo(models.Module, {
      foreignKey: 'ModuleID',
      as: 'module'
    });
  };

  Class.associate = function (models) {
    Class.belongsToMany(models.Module, {
      through: 'ClassModuleJunction',
      foreignKey: 'ClassID',
      otherKey: 'ModuleID',
      as: 'modules'
    });
  };

  Module.associate = function (models) {
    Module.belongsToMany(models.Class, {
      through: 'ClassModuleJunction',
      foreignKey: 'ModuleID',
      otherKey: 'ClassID',
      as: 'classes'
    });
  };

  return ClassModuleJunction;
};
