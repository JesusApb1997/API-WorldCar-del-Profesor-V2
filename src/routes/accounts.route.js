import { Router } from 'express';

import { login, register, getAllUsers } from '../controllers/account.controller.js';

const router = Router();

//definir endpoints
router.post('/login', login); // endpoint para login 

router.post('/register', register); // endpoint para registro de usuario

router.get('/users', getAllUsers); // endpoint para obtener todos los usuarios
router.get('/getAllUsers', getAllUsers); // alias para compatibilidad

export default router;