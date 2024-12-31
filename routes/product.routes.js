const express = require('express');
const productController = require('../controllers/product.controller');
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// api
router.post('/products', authenticate,authorize(['admin', 'employee']), productController.createProduct); 
router.get('/aproducts', productController.getAllProducts); 
router.get('/products/:id', productController.getProductById); 
router.put('/products/:id', authenticate,authorize(['admin', 'employee']),productController.updateProduct); 
router.delete('/products/:id', authenticate,authorize(['admin', 'employee']),productController.deleteProduct); 
router.get('products',productController.searchProducts);
module.exports = router;
