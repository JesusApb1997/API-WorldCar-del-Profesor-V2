export default (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', { //Definir el modelo de la tabla accounts
        name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'brand', // Nombre de la tabla a la que hace referencia
                key: 'id' // Columna de la tabla referenciada
            }
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'productTypes', // Nombre de la tabla a la que hace referencia
                key: 'id' // Columna de la tabla referenciada
            }
        }
    }, {
        tableName: 'products',
        timestamps: false
    });

    return Products;
};