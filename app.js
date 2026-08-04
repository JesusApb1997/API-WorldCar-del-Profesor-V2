import express from 'express';
import dotenv from 'dotenv';
import brandRoutes from './src/routes/brand.route.js';
import productRoutes from './src/routes/product.route.js';
import productTypeRoutes from './src/routes/productType.route.js';
dotenv.config();

// importar routes
import accountRoutes from './src/routes/accounts.route.js';

const app = express(); // crear una instancia de express
app.use(express.json()); // middleware para parsear el body de las peticiones como JSON
app.use(express.urlencoded({ extended: true })); // middleware para parsear el body de las peticiones como JSON

// routes
app.use('/api/accounts', accountRoutes); // implementar las rutas de accounts.route.js en la ruta /api
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productTypes', productTypeRoutes);

// api/accounts/register
// api/accounts/login
// api/accounts/logout
// api/accounts/profile
// api/accounts/update
// api/accounts/delete
// api/accounts/get
// api/brands/getAllBrand
// api/brands/createBrand
// api/brands/updateBrand
// api/brands/deleteBrand

const PORT = process.env.PORT || 3000;
//iniciar el servidor
app.listen(PORT, () => {
    console.log('Server started on ' + PORT);
});


