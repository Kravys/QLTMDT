const express = require('express');
const statisticsController = require('../controllers/statistics.controller');
const { authorize } = require('../middlewares/role.middleware');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/update', authenticate, authorize(['admin']),statisticsController.updateStatistics);
router.get('/:productId', authenticate, authorize(['admin']),statisticsController.getStatisticsByProduct);
router.get('/', authenticate, authorize(['admin']),statisticsController.getAllStatistics);

module.exports = router;
//api3