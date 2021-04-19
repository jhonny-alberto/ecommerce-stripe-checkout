import asyncHandler from 'express-async-handler';
import Subcategory from '../models/subCategoryModel.js';

// @desc    Fetch the subcategories of the certain category
// @route   POST /api/models/
// @access  Public
const getSubCategories = asyncHandler(async (req, res) => {
  let subCategories
  const { category } = req.body
  if(category) {
    subCategories = await Subcategory.find({category}).populate('category', 'name description')
  } else {
    subCategories = await Subcategory.find({}).populate('category', 'name description')
  }
  res.json({subCategories});
})

// @desc    Fetch single subcategory
// @route   GET /api/models/:id
// @access  Public
const getSubCategoryById = asyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.id).populate('category', 'name description')
  if (subcategory) {
    res.json(subcategory)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Add Subcategory by Admin
// @route   POST /api/models/create
// @access  Private/Admin
const createSubCategory = asyncHandler(async (req, res) => {
  const subcategory = new Subcategory({...req.body})
  try {
    const createSubCategory = await subcategory.save()
    res.status(201).json(createSubCategory)
  } catch(err) {
    res.status(404)
    throw new Error(err)
  }
})

// @desc    Update SubCategory by Admin
// @route   PUT /api/models/:id
// @access  Private/Admin
const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
    name,
    description,
    category
  } = req.body

  const subcategory = await Subcategory.findById(id)

  if(subcategory) {
    subcategory.name = name
    subcategory.description = description
    subcategory.category = category

    const updateSubcategory = await subcategory.save()
    res.status(201).json(updateSubcategory)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    delete SubCategory by Admin
// @route   delete /api/models/:id
// @access  Private/Admin
const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params
  const subcategory = await Subcategory.findById(id)
  // console.log(subcategory)

  if(subcategory) {
    await subcategory.remove()
    res.status(201).json({ message: 'Model removed' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

export {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  getSubCategoryById,
  deleteSubCategory
}
