import { ProductType } from '../models/index.js';

export const getAllProductTypes = async (req, res) => {
    const { id } = req.query;

    try {
        const productTypes = await ProductType.findAll({
            attributes: ['id', 'name', 'description'],
            where: id ? { id } : undefined
        });

        return res.status(200).json({
            result: 'success',
            msg: 'Tipos de producto obtenidos correctamente',
            data: productTypes
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al obtener los tipos de producto',
            error: error.message
        });
    }
};

export const getAllProductType = getAllProductTypes;

export const createProductType = async (req, res) => {
    const { name, description } = req.body || {};

    if (!name || !description) {
        return res.status(400).json({
            result: 'error',
            msg: 'Nombre y descripción son obligatorios'
        });
    }

    try {
        const productType = await ProductType.create({ name, description });
        return res.status(201).json({
            result: 'success',
            msg: 'Tipo de producto creado correctamente',
            data: productType
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al crear el tipo de producto',
            error: error.message
        });
    }
};

export const updateProductType = async (req, res) => {
    const { id, name, description } = req.body || {};

    if (!id || !name || !description) {
        return res.status(400).json({
            result: 'error',
            msg: 'ID, nombre y descripción son obligatorios'
        });
    }

    try {
        const [updated] = await ProductType.update({ name, description }, { where: { id } });

        if (!updated) {
            return res.status(404).json({
                result: 'error',
                msg: 'Tipo de producto no encontrado'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Tipo de producto actualizado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al actualizar el tipo de producto',
            error: error.message
        });
    }
};

export const deleteProductType = async (req, res) => {
    const { id } = req.body || {};

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID es obligatorio'
        });
    }

    try {
        const deleted = await ProductType.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({
                result: 'error',
                msg: 'Tipo de producto no encontrado'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Tipo de producto eliminado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al eliminar el tipo de producto',
            error: error.message
        });
    }
};
