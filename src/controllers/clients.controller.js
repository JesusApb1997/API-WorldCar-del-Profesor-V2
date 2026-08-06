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
};    