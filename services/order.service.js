const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const Product = require('../models/product.model');

const getAllOrders = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'orderItems', 
          attributes: ['product_id', 'quantity', 'price'], 
        },
      ],
    });

    return orders;
  } catch (error) {
    throw new Error('Error fetching all orders: ' + error.message);
  }
};
/**
 * 
 * @param {number} user_id 
 * @param {Array} items 
 * @returns {Promise<Object>} 
 */
const createOrder = async (user_id, items, address) => {
    let total_price = 0;

    for(let item of items){
        const product = await Product.findByPk(item.product_id)
        if(!product){
            Error( 404, 'Product not found');
        }
        if(product.quantity < item.quantity){
            Error( 404, 'Product quantity is not available');
        }
        total_price += product.price * item.quantity;
    }

    const order = await Order.create({
        user_id,
        total_price,
        delivery_status: 'pending',
        address
      });
      console.log(address);
    for(let item of items){
        await OrderItem.create({
            order_id : order.id,
            product_id : item.product_id,
            quantity : item.quantity,
            price : item.price  * (await Product.findByPk(item.product_id)).price,
        });
        const product = await Product.findByPk(item.product_id);
        product.quantity -= item.quantity;
        await product.save();
      }
      return order;
    };
/**
 * @param {number} user_id 
 * @returns {Promise<Array>}
 */

const getOrdersByUser = async (user_id) => {
    const order = await Order.findAll({
        where : {user_id},
        include : [{model : OrderItem}]
    });
    return order;
};
/**
 * @param {number} order_id
 * @returns {Promise<Object>}
 */
const getOrderById = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: OrderItem,
          as: 'orderItems',  
          attributes: ['product_id', 'quantity', 'price'],  
        },
      ],
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  } catch (error) {
    throw new Error('Error fetching order: ' + error.message);
  }
};
/**
 * @param {number} order_id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const updateOrder = async (order_id, updateData) => {
  try {
    const order = await Order.findByPk(order_id);

    if (!order) {
      throw new Error('Order not found');
    }

    const updatedOrder = await order.update(updateData);

    return updatedOrder;
  } catch (error) {
    throw new Error('Error updating order: ' + error.message);
  }
};
module.exports = {
    createOrder,
    getOrdersByUser,
    getOrderById,
    updateOrder,
    getAllOrders
  };
  // test


    
  