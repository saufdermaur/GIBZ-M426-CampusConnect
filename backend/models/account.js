const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Account extends Model { }

  const bcrypt = require('bcrypt');
  const saltRounds = 10;

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
    hooks: {
      beforeCreate: async (account) => {
        const hash = await bcrypt.hash(account.PasswordHash, saltRounds);
        account.PasswordHash = hash;
      },
      beforeUpdate: async (account) => {
        if (account.changed('PasswordHash')) {
          const hash = await bcrypt.hash(account.PasswordHash, saltRounds);
          account.PasswordHash = hash;
        }
      }
    },
  },
    {
      sequelize,
      modelName: 'Account',
      tableName: 'Accounts'
    });

  Account.associate = function (models) {
    this.hasMany(models.Module, {
      foreignKey: 'AccountID',
      as: 'modules'
    });
  };

  return Account;
};
