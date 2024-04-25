const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Department extends Model { }

  Department.init({
    DepartmentID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    Abbreviation: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Department',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Department;
};
