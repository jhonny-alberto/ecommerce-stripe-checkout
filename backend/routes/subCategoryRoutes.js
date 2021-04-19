import express from 'express'
const router = express.Router()
import {
  getSubCategories,
  deleteSubCategory,
  createSubCategory,
  updateSubCategory,
  getSubCategoryById
} from '../controllers/SubcategoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
router.route('/')
  .post(getSubCategories)
router.route('/create')
  .post(protect, admin, createSubCategory)
router
  .route('/:id')
  .get(getSubCategoryById)
  .delete(protect, admin, deleteSubCategory)
  .put(protect, admin, updateSubCategory)

export default router
