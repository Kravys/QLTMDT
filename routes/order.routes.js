const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

// api2
router.post('/crOrder', authenticate,authorize(['customer', 'admin']) ,orderController.createOrder); 
router.get('/uOrder/user/:user_id',  authenticate,authorize(['admin' , 'employee']),orderController.getOrdersByUser); 
router.get('/idOrder/:id',  authenticate,authorize(['admin', 'employee']),orderController.getOrderById); 

module.exports = router;
