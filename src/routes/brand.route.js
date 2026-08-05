import { Router } from 'express';
import { getAllBrand, getAllBrands, createBrand, updateBrand, deleteBrand } from '../controllers/brand.controller.js';


const router = Router();

router.get('/getAllBrand', getAllBrand);
router.get('/getAll', getAllBrands);
router.post('/createBrand', createBrand);
router.put('/updateBrand', updateBrand);
router.delete('/deleteBrand', deleteBrand);
router.put('/updateBrand/:id', updateBrand);
// ejemplo: /updateBrand/1 , 1 es el id de la marca a actualizar

export default router;