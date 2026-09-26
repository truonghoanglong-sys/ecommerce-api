const express = require('express');
const shipmentController = require('../controllers/shipmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', roleMiddleware(1), shipmentController.create);
router.put('/:shipid/status', roleMiddleware(1), shipmentController.updateStatus);
router.get('/order/:orderId', shipmentController.getByOrder);

module.exports = router;