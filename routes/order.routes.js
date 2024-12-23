const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');


router.post('/crOrder', authenticate,authorize(['customer']),orderController.createOrder); 
router.get('/aOrder',  authenticate,authorize(['customer']),orderController.getUserOrders); 
router.put('/cancel/:id',  authenticate,authorize(['admin', 'employee']),orderController.cancelOrder); 

module.exports = router;
