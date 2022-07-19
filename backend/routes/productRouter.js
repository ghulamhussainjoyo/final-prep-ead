const express = require('express');
const { createProduct, products, deleteProduct, updateProduct } = require('../controller/productController');
const authorizeRoles = require('../middleware/authorizeRole');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const route = express.Router();

// POST
route.post('/product/create', isAuthenticated, authorizeRoles('admin'), createProduct);

// GET
route.get('/products', products);

// delete
route.delete('/product/:id', isAuthenticated, authorizeRoles('admin'), deleteProduct);


//PUT 
route.put('/product/:id', isAuthenticated, authorizeRoles('admin'), updateProduct);

module.exports = route;
