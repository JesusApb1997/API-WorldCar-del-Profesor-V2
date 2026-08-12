import { Clients } from "../models/index.js";

export const getAllClients = async (req, res) => {
    try {
        const clients = await Clients.findAll();
        return res.status(200).json({
            result: 'success',
            msg: 'Clientes obtenidos correctamente',
            data: clients
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al obtener los clientes',
            error: error.message
        });
    }


}

//aqui actualizaremos los clientes
export const updateClients = async (req, res) => {
    const id = req.params.id || req.body?.id;

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID es obligatorio'
        });
    }

    try {
        const client = await Clients.findAndCountAll({ where: { id } });

        if (client.count === 0) {
            return res.status(404).json({
                result: 'error',
                msg: 'Usuario no encontrado'
            });
        }

        const result = await Clients.update(req.body, { where: { id } });

        return res.status(200).json({
            result: 'success',
            msg: 'Usuario actualizado correctamente',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al actualizar usuario',
            error: error.message
        });
    }
}

//Crear Usuario
export const createClient = async (req, res) => {
    const { firstName, lastName, birthDate, documentId, email, adress, phoneNumber } = req.body;

    try {
        const newClient = await Clients.create({ firstName, lastName, birthDate, documentId, email, adress, phoneNumber });
        return res.status(200).json({
            result: 'success',
            msg: 'Cliente creado correctamente',
            data: newClient
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al crear el cliente',
            error: error.message
        });
    }
}

//eliminar usuario

export const deleteClients = async (req, res) => {
    const id = req.params.id || req.body?.id;

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID es obligatorio'
        });
    }

    try {
        const client = await Clients.findAndCountAll({ where: { id } });

        if (client.count === 0) {
            return res.status(404).json({
                result: 'error',
                msg: 'Usuario no encontrado'
            });
        }

        const result = await Clients.destroy({ where: { id } });

        return res.status(200).json({
            result: 'success',
            msg: 'Usuario eliminado correctamente',
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al eliminar usuario',
            error: error.message
        });
    }
}

//buscar cliente por id

export const searchClients = async (req, res) => {
    const id = req.params.id || req.body?.id;

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID es obligatorio'
        });
    }

    try {
        const client = await Clients.findAndCountAll({ where: { id } });

        if (client.count === 0) {
            return res.status(404).json({
                result: 'error',
                msg: 'Usuario no encontrado'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Usuario encontrado correctamente',
            data: client
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al buscar usuario',
            error: error.message
        });
    }
}