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
      allowNull: false,
    },
    GradeConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    Feedback: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    ReturnDate: {
      type: DataTypes.DATE,
      allowNull: false,
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

  UserExam.associate = function (models) {
    this.belongsTo(models.User, {
      foreignKey: 'UserID',
      as: 'user'
    });
    this.belongsTo(models.Exam, {
      foreignKey: 'ExamID',
      as: 'exam'
    });
  };

  return UserExam;
};
