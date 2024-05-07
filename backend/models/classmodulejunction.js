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
    this.belongsTo(models.Class, { foreignKey: 'ClassID', as: 'class' });
    this.belongsTo(models.Module, { foreignKey: 'ModuleID', as: 'module' });
  };

  return ClassModuleJunction;
};
