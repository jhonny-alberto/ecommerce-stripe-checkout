import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  stripeCheckout
} from '../controllers/orderController.js'
import { protect, admin, filter, deliver } from '../middleware/authMiddleware.js'

router.route('/').post(filter, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/deliver').put(protect, deliver, updateOrderToDelivered)
router.route('/stripecheckout').post(stripeCheckout)

export default router
