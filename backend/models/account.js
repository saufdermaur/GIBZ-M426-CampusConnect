const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  class Account extends Model {}

  Account.init({
    AccountID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    PasswordHash: {
      type: DataTypes.STRING(512),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'Accounts',
    hooks: {
      beforeCreate: async (account) => {
        const saltRounds = 10;
        account.PasswordHash = await bcrypt.hash(account.PasswordHash, saltRounds);
      },
      beforeUpdate: async (account) => {
        if (account.changed('PasswordHash')) {
          const saltRounds = 10;
          account.PasswordHash = await bcrypt.hash(account.PasswordHash, saltRounds);
        }
      }
    }
  });

  Account.associate = function (models) {
    this.hasMany(models.Module, {
      foreignKey: 'AccountID',
      as: 'modules'
    });
  };

  return Account;
};
