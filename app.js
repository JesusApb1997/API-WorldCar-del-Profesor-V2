import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// importar routes
import accountRoutes from './src/routes/accounts.route.js';

const app = express(); // crear una instancia de express
app.use(express.json()); // middleware para parsear el body de las peticiones como JSON
app.use(express.urlencoded({ extended: true })); // middleware para parsear el body de las peticiones como JSON

// routes
app.use('/api/accounts', accountRoutes); // implementar las rutas de accounts.route.js en la ruta /api

const PORT = process.env.PORT || 3000;
//iniciar el servidor
app.listen(PORT, () => {
    console.log('Server started on ' + PORT);
});


