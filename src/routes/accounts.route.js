import { Router } from 'express';

import { login, register } from '../controllers/account.controller.js';

const router = Router();

//definir endpoints
router.post('/login', login); // endpoint para login 

router.post('/register', register); // endpoint para registro de usuario

export default router;