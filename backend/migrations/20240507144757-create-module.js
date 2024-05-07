'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Modules', {
      ModuleID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      AccountID: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Accounts',
          key: 'AccountID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      Description: {
        allowNull: true,
        type: Sequelize.STRING(512)
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
    await queryInterface.dropTable('Modules');
  }
};
