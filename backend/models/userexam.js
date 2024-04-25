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
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'UserExam',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  UserExam.associate = function (models) {
    UserExam.belongsTo(models.User, {
      foreignKey: 'UserID',
      as: 'user'
    });
    UserExam.belongsTo(models.Exam, {
      foreignKey: 'ExamID',
      as: 'exam'
    });
  };

  User.associate = function (models) {
    User.belongsToMany(models.Exam, {
      through: 'UserExam',
      foreignKey: 'UserID',
      otherKey: 'ExamID',
      as: 'exams'
    });
  };

  Exam.associate = function (models) {
    Exam.belongsToMany(models.User, {
      through: 'UserExam',
      foreignKey: 'ExamID',
      otherKey: 'UserID',
      as: 'users'
    });
  };

  return UserExam;
};
