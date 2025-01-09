const { addToCart, getCartItems, removeFromCart } = require('../services/cart.service');

const addProductToCart = async (req, res) => {
  const { user_id } = req.params;
  const { product_id, quantity } = req.body;

  try {
    const cartItem = await addToCart(user_id, product_id, quantity);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const { user_id } = req.params;

  try {
    const cartItems = await getCartItems(user_id);
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const { user_id } = req.params;
  const { product_id } = req.body;

  try {
    await removeFromCart(user_id, product_id);
    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addProductToCart,
  getCart,
  removeProductFromCart,
};
