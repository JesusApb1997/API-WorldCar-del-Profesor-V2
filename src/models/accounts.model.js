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
      unique: true, //no puede haber dos correos iguales
      validate: {
        isEmail: true, //debe ser un correo electronico
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
      async beforeCreate(account) { //antes de crear un usuario
        if (account.password) {
          account.password = await bcrypt.hash(account.password, 10);
        }
      },
      async beforeUpdate(account) {
        if (account.changed('password')) {
          account.password = await bcrypt.hash(account.password, 10); //encriptar la contraseña
        }
      },
    },
  });

  Account.prototype.validatePassword = async function (password) {
    if (!password || !this.password) {
      return false; //si no hay contraseña, no se puede validar
    }

    const storedPassword = this.password;
    const isBcryptHash = storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$') || storedPassword.startsWith('$2y$');

    if (isBcryptHash) {
      return await bcrypt.compare(password, storedPassword); //comparar la contraseña encriptada
    }

    return storedPassword === password; //esto es para comparar la contraseña en texto plano
  };

  return Account;
};