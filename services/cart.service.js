const Cart = require('../models/cart.model');
const CartItem = require('../models/cart_items.model');
const Product = require('../models/product.model');


const getOrCreateCart = async (user_id)=>{
    let cart = await Cart.findOne({ where: { user_id } });

  if (!cart) {
    cart = await Cart.create({ user_id });
  }

  return cart;
}
const addToCart = async (user_id, product_id, quantiny)=>{
    const cart = await getOrCreateCart(user_id);
  const product = await Product.findByPk(product_id);

  if (!product) {
    throw new Error('Product not found');
  }

  let cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id } });

  if (cartItem) {
    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    cartItem = await CartItem.create({ cart_id: cart.id, product_id, quantity });
  }

  return cartItem;
}
const removeFromCart = async (user_id, product_id)=>{
    const cart = await getOrCreateCart(user_id);
    const cartItem = await CartItem.findOne({ where: { cart_id: cart.id, product_id } });

  if (!cartItem) {
    throw new Error('Product not in cart');
  }

  await cartItem.destroy();
}
const getCartItems = async (user_id)=>{
    const cart = await getOrCreateCart(user_id);

    const items = await CartItem.findAll({ 
        where: { cart_id: cart.id },
        include: [{model:Product, as:'product', attributes:['name','price']}]});
    
    return items;
}
module.exports = {
    getOrCreateCart,
    addToCart,
    removeFromCart,
    getCartItems
};