import { Router } from 'express';
import { getAllClients } from '../controllers/clients.controller.js';

const router = Router();

router.get('/getAllClients', getAllClients);
//este es un ejemplo de como se puede hacer una peticion a la api en postman
//GET http://localhost:3000/api/clients/getAllClients

export default router;