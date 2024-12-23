const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    try {
        const { items } = req.body; 
        const userId = req.user._id;
        const newOrder = await orderService.createOrder(userId, items);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await orderService.getUserOrders(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const result = await orderService.cancelOrder(orderId);
        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling order', error });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    cancelOrder,
};
