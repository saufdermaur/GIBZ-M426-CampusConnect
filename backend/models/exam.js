const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Exam extends Model { }
  Exam.init({
    ExamID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    ModuleID: {
      type: DataTypes.UUID,
      allowNull: false
    },
    Grade: {
      type: DataTypes.REAL,
      allowNull: true
    },
    Weight: {
      type: DataTypes.REAL,
      allowNull: true
    },
    ExamTitle: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    ExamDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Exam',
    tableName: 'Exams'
  });

  Exam.associate = function (models) {
    this.belongsTo(models.Module, {
      foreignKey: 'ModuleID',
      as: 'module'
    });
  };

  return Exam;
};
