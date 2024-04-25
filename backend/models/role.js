const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Role extends Model { }

  Role.init({
    RoleID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'RoleID',
      as: 'users'
    });
  };

  return Role;
};
