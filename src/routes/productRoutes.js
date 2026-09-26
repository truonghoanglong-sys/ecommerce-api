const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Public: ai cũng xem được
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Chỉ admin (roleid = 1)
router.post('/', authMiddleware, roleMiddleware(1), productController.create);
router.put('/:id', authMiddleware, roleMiddleware(1), productController.update);
router.delete('/:id', authMiddleware, roleMiddleware(1), productController.remove);

module.exports = router;