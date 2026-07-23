//aqui tenemos las formulas del modelo de datos de la tabla accounts
//asi se llama el archivo accounts.model.js para que sequelize lo encuentre y sepa que debe crear una tabla con ese nombre en la base de datos
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
export default (sequelize) => {
  const Account = sequelize.define('Account', { //Definir el modelo de la tabla accounts
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Validar que el email no sea nulo
      unique: true, // Validar que el email sea único
      validate: {
        isEmail: true, // Validar que el email sea válido
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Validar que la contraseña no sea nula
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, //validar que el nombre no sea nulo
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, //
    },
    isActived: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    tableName: 'accounts',
    timestamps: false,
    /* hooks: {
      async beforeCreate(account) { // hook para encriptar la contraseña antes de guardar el usuario
        if (account.password) {
          account.password = await bcrypt.hash(account.password, 10);
        }
      },
      async beforeUpdate(account) {
        if (account.changed('password')) {
          account.password = await bcrypt.hash(account.password, 10);
        }
      },
    }, */

  });
  /*  Account.prototype.validatePassword = async function (password) {
     return await bcrypt.compare(password, this.pass);
   } */
  return Account;
};