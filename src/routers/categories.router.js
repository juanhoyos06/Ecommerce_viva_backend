const express = require('express');
const router = express.Router();

const { CategoriesController } = require('../controllers/index.controller');
const _categoryController = new CategoriesController();

router.get('/', _categoryController.getCategories);
router.get('/:id', _categoryController.getCategory);
router.post('/', _categoryController.createCategory);
router.put('/:id', _categoryController.updateCategory);
router.delete('/:id', _categoryController.deleteCategory);

module.exports = router;