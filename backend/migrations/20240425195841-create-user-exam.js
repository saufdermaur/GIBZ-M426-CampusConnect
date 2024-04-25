'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserExams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserExamID: {
        type: Sequelize.UUID
      },
      UserID: {
        type: Sequelize.UUID
      },
      ExamID: {
        type: Sequelize.UUID
      },
      ExamGrade: {
        type: Sequelize.REAL
      },
      GradeConfirmed: {
        type: Sequelize.BOOLEAN
      },
      Feedback: {
        type: Sequelize.STRING
      },
      ReturnDate: {
        type: Sequelize.DATE
      },
      ConfirmDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserExams');
  }
};