const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model { }

  User.init({
    UserID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    FirstName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    LastName: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    RoleID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'RoleID',
      },
    },
    PasswordHash: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    InitPassword: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'RoleID',
      as: 'role'
    });
  };

  return User;
};
