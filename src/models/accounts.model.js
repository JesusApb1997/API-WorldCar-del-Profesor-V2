//aqui tenemos las formulas del modelo de datos de la tabla accounts
//asi se llama el archivo accounts.model.js para que sequelize lo encuentre y sepa que debe crear una tabla con ese nombre en la base de datos
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
  const Account = sequelize.define('Account', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActived: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    tableName: 'accounts',
    timestamps: false,
    hooks: {
      async beforeCreate(account) {
        if (account.password) {
          account.password = await bcrypt.hash(account.password, 10);
        }
      },
      async beforeUpdate(account) {
        if (account.changed('password')) {
          account.password = await bcrypt.hash(account.password, 10);
        }
      },
    },
  });

  Account.prototype.validatePassword = async function (password) {
    if (!password || !this.password) {
      return false;
    }

    const storedPassword = this.password;
    const isBcryptHash = storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$');

    if (isBcryptHash) {
      return await bcrypt.compare(password, storedPassword);
    }

    return storedPassword === password;
  };

  return Account;
};