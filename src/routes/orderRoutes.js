const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Tất cả route order đều cần đăng nhập
router.use(authMiddleware);

router.post('/', orderController.create);
router.get('/my', orderController.getMyOrders);
router.get('/:id', orderController.getById);

module.exports = router;