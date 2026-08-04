import { Brand } from '../models/index.js';

export const getAllBrand = async (req, res) => {
    const { id } = req.query;

    try {
        const brands = await Brand.findAll({
            attributes: ['id', 'name'],
            where: id ? { id } : undefined
        });

        return res.status(200).json({
            result: 'success',
            msg: 'Marcas obtenidas correctamente',
            data: brands
        });
    } catch (error) {
        return res.status(400).json({
            result: 'error',
            msg: 'Error al obtener las marcas',
            error: error.message
        });
    }
};

export const getAllBrands = getAllBrand;

export const createBrand = async (req, res) => {
    const { name } = req.body || {};

    if (!name) {
        return res.status(400).json({
            result: 'error',
            msg: 'El nombre de la marca es obligatorio'
        });
    }

    try {
        const brand = await Brand.create({ name });
        return res.status(201).json({
            result: 'success',
            msg: 'Marca creada correctamente',
            data: brand
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al crear la marca',
            error: error.message
        });
    }
};

export const updateBrand = async (req, res) => {
    const { id, name } = req.body || {};

    if (!id || !name) {
        return res.status(400).json({
            result: 'error',
            msg: 'ID y nombre son obligatorios'
        });
    }

    try {
        const [updated] = await Brand.update({ name }, { where: { id } });

        if (!updated) {
            return res.status(404).json({
                result: 'error',
                msg: 'Marca no encontrada'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Marca actualizada correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al actualizar la marca',
            error: error.message
        });
    }
};

export const deleteBrand = async (req, res) => {
    const { id } = req.body || {};

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID es obligatorio'
        });
    }

    try {
        const deleted = await Brand.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({
                result: 'error',
                msg: 'Marca no encontrada'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Marca eliminada correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al eliminar la marca',
            error: error.message
        });
    }
};
