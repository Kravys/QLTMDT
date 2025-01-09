const express = require('express');
const { addProductToCart, getCart, removeProductFromCart } = require('../controllers/cart.controller');
const router = express.Router();

router.post('/:user_id', addProductToCart);
router.get('/:user_id', getCart);
router.delete('/:user_id', removeProductFromCart);

module.exports = router;
