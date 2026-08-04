import { Account } from '../models/index.js';

export const login = async (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            result: false,
            msg: 'Email y contraseña son obligatorios'
        });
    }

    const user = await Account.findOne({
        attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'isActived'],
        where: { email }
    });

    if (!user) {
        return res.status(404).json({
            result: false,
            msg: 'Usuario no encontrado'
        });
    }

    if (!user.isActived) {
        return res.status(401).json({
            result: false,
            msg: 'Usuario inactivo'
        });
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({
            result: false,
            msg: 'Contraseña incorrecta'
        });
    }

    const userWithoutPassword = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isActived: user.isActived
    };

    return res.status(200).json({
        result: true,
        msg: 'Usuario autenticado correctamente',
        data: userWithoutPassword
    });
};

export const register = async (req, res) => {
    const { email, password, firstName, lastName } = req.body || {};

    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            result: false,
            msg: 'Todos los campos son obligatorios'
        });
    }

    const validateEmail = await Account.findOne({ where: { email } });
    if (validateEmail) {
        return res.status(409).json({
            result: false,
            msg: 'El email ya existe'
        });
    }

    const t = await Account.sequelize.transaction();

    try {
        const result = await Account.create({
            email,
            password,
            firstName,
            lastName
        }, { transaction: t });

        await t.commit();

        return res.status(201).json({
            result: true,
            msg: 'Usuario registrado correctamente',
            data: result
        });
    } catch (error) {
        await t.rollback();
        return res.status(500).json({
            result: false,
            msg: 'Error al crear el usuario',
            error: error.message
        });
    }
};

export const getAllUsers = async (req, res) => {
    const { id, isActived } = req.query;

    try {
        const users = await Account.findAll({
            attributes: ['id', 'email', 'firstName', 'lastName', 'isActived'],
            where: {
                ...(id && { id }),
                ...(isActived !== undefined && { isActived: isActived === 'true' || isActived === true })
            }
        });

        return res.status(200).json({
            result: true,
            msg: 'Usuarios obtenidos correctamente',
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            result: false,
            msg: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};