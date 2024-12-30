const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');


router.post('/crOrder', authenticate,authorize(['customer', 'admin']) ,orderController.createOrder); 
router.get('/uOrder',  authenticate,authorize(['customer']),orderController.getOrdersByUser); 
router.put('/cancel/:id',  authenticate,authorize(['admin', 'employee']),orderController.getOrderById); 

module.exports = router;
