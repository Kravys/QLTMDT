const Statistics = require('../models/statistics.model');
const OrderItem = require('../models/orderItem.model');
const Product = require('../models/product.model');

const updateStatistics = async (productId, quantity, revenue) => {
  try {
    const [stats, created] = await Statistics.findOrCreate({
      where: { product_id: productId },
      defaults: {
        sold_count: quantity,
        total_revenue: revenue,
        last_sold: new Date(),
      },
    });

    if (!created) {
      stats.sold_count += quantity;
      stats.total_revenue += revenue;
      stats.last_sold = new Date();
      await stats.save();
    }

    return stats;
  } catch (error) {
    throw new Error('Error updating statistics: ' + error.message);
  }
};

const getStatisticsByProduct = async (productId) => {
  try {
    const stats = await Statistics.findOne({
      where: { product_id: productId },
    });

    if (!stats) {
      throw new Error('Statistics not found for the specified product');
    }

    return stats;
  } catch (error) {
    throw new Error('Error fetching statistics: ' + error.message);
  }
};

const getAllStatistics = async () => {
  try {
    const stats = await Statistics.findAll({
      include: [{ model: Product, as: 'product', attributes: ['name', 'price'] }],
    });
    return stats;
  } catch (error) {
    throw new Error('Error fetching all statistics: ' + error.message);
  }
};

module.exports = {
  updateStatistics,
  getStatisticsByProduct,
  getAllStatistics,
};
