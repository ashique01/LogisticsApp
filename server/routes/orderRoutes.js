const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/stats', authMiddleware, orderController.getStats); 
router.get('/:trackingId', orderController.getOrderByTrackingId); 

// Protected routes (require authentication)
router.get('/user/orders', authMiddleware, orderController.getOrdersForUser); 
router.get('/', authMiddleware, orderController.getAllOrders);
router.post('/', authMiddleware, orderController.createOrder); 
router.put('/:trackingId/status', authMiddleware, orderController.updateOrderStatus); 
router.delete('/:id', authMiddleware, orderController.deleteOrder); 

module.exports = router;
