import { Account } from '../models/index.js';
export const login = async (req, res) => {
    // recibir los datos del body de la petición
    const { email, password } = req.body;

    // buscar el usuario en la base de datos
    const result = await Account.findOne({ where: { email: email, password: password } });
    if (!result) {
        return res.status(404).json({
            result: false,
            msg: 'Usuario no encontrado'
        });
    }
    if (!result.isActived) {
        return res.json({
            result: false,
            msg: 'Usuario inactivo'
        });
    }
    res.status(200).json({
        result: true,
        msg: 'Usuario autenticado correctamente',
        data: result
    });

}

export const register = (req, res) => {

    res.status(200).json({
        result: true,
        msg: 'Usuario registrado correctamente'
    })
}

export const register = (req, res) => {
    
    const { email, password, firstName, lastName } = req.body;
    //validar que el email no exista en la base de datos
    const validateEmail = Account.findOne({ where: { email: email } });
    if (validateEmail) {
        return res.json({
            result: false,
            msg: 'El email ya existe'
        });
    }
    // crear el usuario en la bse de datos
    const result = Account.create(
        {email: email, password: password, firstName: firstName, lastName: lastName}

    );
}