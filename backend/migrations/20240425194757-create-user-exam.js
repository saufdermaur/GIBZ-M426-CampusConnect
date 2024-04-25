'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserExams', {
      UserExamID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      UserID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'UserID'
        }
      },
      ExamID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Exams',
          key: 'ExamID'
        }
      },
      ExamGrade: {
        type: Sequelize.REAL,
        allowNull: true,
      },
      GradeConfirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Feedback: {
        type: Sequelize.STRING(512),
        allowNull: true,
      },
      ReturnDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      ConfirmDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserExams');
  }
};
