import { Router } from 'express';
import { getAllClients, updateClients, createClient, deleteClients, searchClients } from '../controllers/clients.controller.js';

const router = Router();


router.get('/searchClients/:id', searchClients);
//ejemplo: GET http://localhost:3000/api/clients/searchClients/1
router.delete('/deleteClients/:id', deleteClients);
//ejemplo: DELETE http://localhost:3000/api/clients/deleteClients/1
router.post('/createClient', createClient);
//ejemplo POST http://localhost:3000/api/clients/createClient

router.put('/updateClients/:id', updateClients);
//este es un ejemplo de como se puede hacer una peticion a la api de postman
//PUT http://localhost:3000/api/clients/updateClients/1

router.get('/getAllClients', getAllClients);
//este es un ejemplo de como se puede hacer una peticion a la api en postman
//GET http://localhost:3000/api/clients/getAllClients
export default router;