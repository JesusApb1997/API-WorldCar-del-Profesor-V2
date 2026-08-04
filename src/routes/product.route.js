import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.get('/getAllProducts', getAllProducts);
router.get('/getAll', getAllProducts);
router.get('/getById/:id', getProductById);
router.post('/createProduct', createProduct);
router.put('/updateProduct', updateProduct);
router.delete('/deleteProduct', deleteProduct);

export default router;
