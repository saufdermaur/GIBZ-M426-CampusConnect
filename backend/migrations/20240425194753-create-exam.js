'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Exams', {
      ExamID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ClassModuleID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ClassModuleJunctions',
          key: 'ClassModuleID'
        }
      },
      ExamDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      ExamTitle: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING(512),
        allowNull: false,
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
    await queryInterface.dropTable('Exams');
  }
};
