import { Router } from 'express';
import { getAllBrand, createBrand, updateBrand, deleteBrand } from '../controllers/brand.controller.js';


const router = Router();

router.post('/createBrand', createBrand);
//ejemplo: POST http://localhost:3000/api/brand/createBrand
router.get('/getAllBrand', getAllBrand);
//ejemplo: GET http://localhost:3000/api/brand/getAllBrand
router.put('/updateBrand', updateBrand);
//ejemplo: PUT http://localhost:3000/api/brand/updateBrand
router.delete('/deleteBrand/:id', deleteBrand);
//ejemplo: DELETE http://localhost:3000/api/brand/deleteBrand/:id
router.put('/updateBrand/:id', updateBrand);
// ejemplo: /updateBrand/:id , 1 es el id de la marca a actualizar



export default router;