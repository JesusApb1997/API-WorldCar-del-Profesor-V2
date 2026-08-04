import { Router } from 'express';
import { getAllBrand, getAllBrands, createBrand, updateBrand, deleteBrand } from '../controllers/brand.controller.js';

const router = Router();

router.get('/getAllBrand', getAllBrand);
router.get('/getAll', getAllBrands);
router.post('/createBrand', createBrand);
router.put('/updateBrand', updateBrand);
router.delete('/deleteBrand', deleteBrand);

export default router;