import { Brand } from '../models/index.js';

export const getAllBrand = async (req, res) => {
    const { id } = req.query;

    try {
        const brands = await Brand.findAll({
            attributes: ['id', 'name'], //solo trae el id y el nombre
            where: id ? { id } : undefined //si se pasa un id, trae solo esa marca, si no, trae todas
        });

        return res.status(200).json({
            result: true,
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


export const updateBrand = async (req, res) => {
    const id = req.params.id || req.body?.id;
    const name = req.body?.name || req.body?.nameBrand;

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


export const updateBrandName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        //validar si la marca existe
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({
                result: 'error',
                msg: 'Marca no encontrada'
            });
        }
        //actualizar la marca
        brand.name = name;
        await brand.save();
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

//funsion para creacion de la marca en la base de datos
export const createBrand = async (req, res) => {
    const nameBrand = req.body?.nameBrand || req.body?.name;

    // Validar que el nombre de la marca no esté vacío
    if (!nameBrand || typeof nameBrand !== 'string' || nameBrand.trim() === '') {
        return res.status(400).json({
            result: 'error',
            msg: 'El nombre de la marca es obligatorio'
        });
    }
    // aqui confirma si ya existe
    try {

        const existingBrand = await Brand.findOne({
            where: { name: nameBrand.trim() }
        });

        if (existingBrand) {
            return res.status(400).json({
                result: 'error',
                msg: 'La marca ya existe',
            });
        }
        //aqui confirma la creacion de la marca
        const newBrand = await Brand.create({
            name: nameBrand.trim()
        });
        return res.status(200).json({
            result: 'success',
            msg: 'Marca creada correctamente',
            data: newBrand
        });

    }
    catch (error) {
        return res.status(500).json({
            result: 'error',
            msg: 'Error al crear la marca',
            error: error.message
        });
    }

};
// aqui se elimina la marca por id
export const deleteBrand = async (req, res) => {
    const { id } = req.params;

    try {
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).json({
                result: 'error',
                msg: 'Marca no encontrada'
            });
        }
        await brand.destroy();
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

