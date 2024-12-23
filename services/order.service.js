const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const Product = require('../models/product.model');


const createOrder = async (userId, items) => {
    const session = await Order.startSession();
    session.startTransaction();

    try {
     
        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) throw new Error('Product not found');
            totalAmount += product.price * item.quantity;
        }

      
        const newOrder = await Order.create([{ user: userId, totalAmount }], { session });

       
        for (const item of items) {
            await OrderItem.create(
                [
                    {
                        order: newOrder[0]._id,
                        product: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    },
                ],
                { session }
            );
        }

        await session.commitTransaction();
        session.endSession();

        return newOrder[0];
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

const getUserOrders = async (userId) => {
    return await Order.find({ user: userId }).populate('user').sort({ createdAt: -1 });
};

const cancelOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) return null;

    order.status = 'cancelled';
    await order.save();

    return true;
};
module.exports = {
    createOrder,
    getUserOrders,
    cancelOrder,
};
