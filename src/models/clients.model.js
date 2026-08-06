import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Clients = sequelize.define('Clients', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        documentId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'clients',
        timestamps: false,
    });
    return Clients;
};