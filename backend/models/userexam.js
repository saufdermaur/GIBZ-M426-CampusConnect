const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserExam extends Model { }

  UserExam.init({
    UserExamID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    UserID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'UserID',
      },
    },
    ExamID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Exam',
        key: 'ExamID',
      },
    },
    ExamGrade: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    GradeConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    Feedback: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    ReturnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ConfirmDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'UserExam',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return UserExam;
};
