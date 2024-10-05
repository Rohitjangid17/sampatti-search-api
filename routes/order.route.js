import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/', getOrderById);
router.patch('/', updateOrder);
router.delete('/', deleteOrder);

export default router;
