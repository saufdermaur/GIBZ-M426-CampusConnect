const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Exam extends Model { }

  Exam.init({
    ExamID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    ClassModuleID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ClassModuleJunction',
        key: 'ClassModuleID',
      },
    },
    ExamDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ExamTitle: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Exam',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Exam;
};
