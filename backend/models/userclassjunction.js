const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UserClassJunction extends Model { }

  UserClassJunction.init({
    UserClassID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    ClassID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Class',
        key: 'ClassID',
      },
    },
    UserID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'UserID',
      },
    },
  }, {
    sequelize,
    modelName: 'UserClassJunction',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  UserClassJunction.associate = function (models) {
    this.belongsTo(models.User, {
      foreignKey: 'UserID',
      as: 'user'
    });
    this.belongsTo(models.Class, {
      foreignKey: 'ClassID',
      as: 'class'
    });
  };

  return UserClassJunction;
};
