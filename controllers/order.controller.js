const orderService = require('../services/order.service');


const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders(); 
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching all orders' });
  }
};
const createOrder = async (req, res) => {
    try {
      const { user_id, items } = req.body;
    //   console.log(req.body);

      const order = await orderService.createOrder(user_id, items);
      return res.status(201).json(order);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  };
const getOrdersByUser = async (req, res) => {
    try {
      const orders = await orderService.getOrdersByUser(req.params.user_id);
      return res.status(200).json(orders);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching orders' });
    }
  };
  const getOrderById = async (req, res) => {
    try {
      const orderId = req.params.id;  // Sử dụng req.params.id để truy xuất tham số
      const order = await orderService.getOrderById(orderId);
      return res.status(200).json(order);
    } catch (err) {
      console.error(err);
      return res.status(404).json({ message: err.message });
    }
  };
  const updateOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const updateData = req.body; 
      const updatedOrder = await orderService.updateOrder(orderId, updateData);
  
      return res.status(200).json(updatedOrder);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
  };
  
// const cancelOrder = async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const result = await orderService.cancelOrder(orderId);
//         if (!result) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.status(200).json({ message: 'Order cancelled successfully' });
//         if (req.user.role !== 'admin' && req.user.role !== 'employee') {
//             return res.status(403).json({ message: 'No permission.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error cancelling order', error });
//     }
// };

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUser,
    updateOrder,
    getAllOrders
};
