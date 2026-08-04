import { Product } from '../models/index.js';

export const getAllProducts = async (req, res) => {
    const { id, brandId, typeId } = req.query;

    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'price', 'brandId', 'typeId'],
            where: {
                ...(id && { id }),
                ...(brandId && { brandId }),
                ...(typeId && { typeId })
            }
        });

        return res.status(200).json({
            result: 'success',
            msg: 'Productos obtenidos correctamente',
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al obtener los productos',
            error: error.message
        });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params || req.body || {};

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID del producto es obligatorio'
        });
    }

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                result: 'error',
                msg: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Producto obtenido correctamente',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al obtener el producto',
            error: error.message
        });
    }
};

export const createProduct = async (req, res) => {
    const { name, price, brandId, typeId } = req.body || {};

    if (!name || !price || !brandId || !typeId) {
        return res.status(400).json({
            result: 'error',
            msg: 'Nombre, precio, brandId y typeId son obligatorios'
        });
    }

    try {
        const product = await Product.create({ name, price, brandId, typeId });
        return res.status(201).json({
            result: 'success',
            msg: 'Producto creado correctamente',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al crear el producto',
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id, name, price, brandId, typeId } = req.body || {};

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID es obligatorio'
        });
    }

    try {
        const [updated] = await Product.update(
            { ...(name && { name }), ...(price && { price }), ...(brandId && { brandId }), ...(typeId && { typeId }) },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({
                result: 'error',
                msg: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Producto actualizado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al actualizar el producto',
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.body || {};

    if (!id) {
        return res.status(400).json({
            result: 'error',
            msg: 'El ID es obligatorio'
        });
    }

    try {
        const deleted = await Product.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({
                result: 'error',
                msg: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            result: 'success',
            msg: 'Producto eliminado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al eliminar el producto',
            error: error.message
        });
    }
};
