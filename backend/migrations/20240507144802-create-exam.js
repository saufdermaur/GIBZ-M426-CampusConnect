'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exams', {
      ExamID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ModuleID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Modules',
          key: 'ModuleID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Grade: {
        allowNull: true,
        type: Sequelize.REAL
      },
      Weight: {
        allowNull: true,
        type: Sequelize.REAL
      },
      ExamTitle: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      Description: {
        allowNull: true,
        type: Sequelize.STRING(512)
      },
      ExamDate: {
        allowNull: false,
        type: Sequelize.DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Exams');
  }
};
