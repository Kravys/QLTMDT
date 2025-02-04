const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

// api2
router.post('/crOrder', authenticate,authorize(['customer', 'admin']) ,orderController.createOrder); 
router.get('/uOrder/user/:user_id',  authenticate,authorize(['admin' , 'employee']),orderController.getOrdersByUser); 
router.get('/idOrder/:id',  authenticate,authorize(['admin', 'employee', 'customer']),orderController.getOrderById); 
router.put('/idOrder/:id', authenticate,authorize(['admin', 'employee']),orderController.updateOrder);
router.get('/Order', authenticate, authorize(['admin' , 'employee']), orderController.getAllOrders);
module.exports = router;
