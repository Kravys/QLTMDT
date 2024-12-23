const express = require('express');
const orderController = require('../controllers/order.controller');
const router = express.Router();
const { authorize } = require('../middlewares/role.middleware');

router.post('/crOrder', authorize(['customer']),orderController.createOrder); 
router.get('/aOrder',  authorize(['customer']),orderController.getUserOrders); 
router.put('/cancel/:id',  authorize(['customer']),orderController.cancelOrder); 

module.exports = router;
