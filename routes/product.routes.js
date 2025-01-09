const express = require('express');
const productController = require('../controllers/product.controller');
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// api
router.post('/products', authenticate,authorize(['admin', 'employee']), productController.createProduct); 
router.get('/aproducts', productController.getAllProducts); 
router.get('/products/:id', productController.getProductById); 
router.get('/products', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await getAllProducts(Number(page), Number(limit));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/products/:id', authenticate,authorize(['admin', 'employee']),productController.updateProduct); 
router.delete('/products/:id', authenticate,authorize(['admin', 'employee']),productController.deleteProduct); 
router.get('products',productController.searchProducts);
module.exports = router;
