const Cart = require('./cart.model');
const CartItem = require('./cart.model');
const Product = require('./product.model');
const Order = require('./order.model');
const OrderItem = require('./orderItem.model');
const User = require('./user.model');

// Liên kết giữa Cart và CartItem
Cart.hasMany(CartItem, { foreignKey: 'cart_id', as: 'cartItems' });
CartItem.belongsTo(Cart, { foreignKey: 'cart_id' });

// Liên kết giữa CartItem và Product
CartItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// // Liên kết giữa Order và OrderItem
// Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
// OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

// Liên kết giữa OrderItem và Product
OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

// Liên kết giữa User và các thực thể khác
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Cart, { foreignKey: 'user_id', as: 'cart' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  Cart,
  CartItem,
  Product,
  Order,
  OrderItem,
  User,
};
