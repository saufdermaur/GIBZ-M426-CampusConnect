const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Class extends Model { }

  Class.init({
    ClassID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    DepartmentID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'DepartmentID',
      },
    },
    Name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Class',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  Class.associate = function (models) {
    Class.belongsTo(models.Department, {
      foreignKey: 'DepartmentID',
      as: 'department'
    });
  };

  return Class;
};
