const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Module extends Model { }
  Module.init({
    ModuleID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    AccountID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Module',
    tableName: 'Modules'
  });

  Module.associate = function (models) {
    this.belongsTo(models.Account, {
      foreignKey: 'AccountID',
      as: 'account'
    });
    this.hasMany(models.Exam, {
      foreignKey: 'ModuleID',
      as: 'exams'
    });
  };

  return Module;
};
