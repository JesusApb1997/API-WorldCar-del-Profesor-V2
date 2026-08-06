import { Router } from 'express';
import { getAllBrand, createBrand, updateBrand, deleteBrand } from '../controllers/brand.controller.js';


const router = Router();

router.post('/createBrand', createBrand);
router.get('/getAllBrand', getAllBrand);
router.put('/updateBrand', updateBrand);
router.delete('/deleteBrand/:id', deleteBrand);
router.put('/updateBrand/:id', updateBrand);
// ejemplo: /updateBrand/:id , 1 es el id de la marca a actualizar



export default router;