const express = require('express');
const membershipController = require('../controllers/membershipController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', membershipController.getAll); // public: ai cũng xem được danh sách gói
router.post('/', authMiddleware, roleMiddleware(1), membershipController.create);
router.put('/:id', authMiddleware, roleMiddleware(1), membershipController.update);
router.delete('/:id', authMiddleware, roleMiddleware(1), membershipController.remove);

module.exports = router;