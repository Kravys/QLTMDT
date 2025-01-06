const statisticsService = require('../services/statistics.service');

const updateStatistics = async (req, res) => {
  try {
    const { productId, quantity, revenue } = req.body;

    if (!productId || !quantity || !revenue) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const stats = await statisticsService.updateStatistics(productId, quantity, revenue);
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStatisticsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const stats = await statisticsService.getStatisticsByProduct(productId);
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllStatistics = async (req, res) => {
  try {
    const stats = await statisticsService.getAllStatistics();
    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateStatistics,
  getStatisticsByProduct,
  getAllStatistics,
};
