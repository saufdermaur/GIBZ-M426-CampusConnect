'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      UserID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      FirstName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      RoleID: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'RoleID'
        }
      },
      PasswordHash: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      InitPassword: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    await queryInterface.dropTable('Users');
  }
};
