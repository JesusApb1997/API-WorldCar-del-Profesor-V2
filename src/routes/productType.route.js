import { Router } from 'express';
import {
    getAllProductType,
    getAllProductTypes,
    createProductType,
    updateProductType,
    deleteProductType
} from '../controllers/productType.controller.js';

const router = Router();

router.get('/getAllProductType', getAllProductType);
router.get('/getAll', getAllProductTypes);
router.post('/createProductType', createProductType);
router.put('/updateProductType', updateProductType);
router.delete('/deleteProductType', deleteProductType);

export default router;
