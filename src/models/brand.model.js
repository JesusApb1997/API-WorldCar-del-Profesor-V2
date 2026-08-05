import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Brand = sequelize.define('Brand', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, //incremento automatico
            primaryKey: true, //es la llave primaria
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, //no puede estar vacio
            unique: true, //no puede haber dos marcas iguales
        }
    }, {
        tableName: 'brand',
        timestamps: false,
    });
    return Brand; //retorna el modelo de la tabla brand
};

//ahora continua con el siguiente modelo
