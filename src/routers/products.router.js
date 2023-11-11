const express = require('express');
const router = express.Router();

const { ProductsController } = require('../controllers/index.controller');
const _productController = new ProductsController();

router.get('/', _productController.getProducts);
router.get('/:id', _productController.getProduct);
router.post('/', _productController.createProduct);
router.put('/:id', _productController.updateProduct);
router.delete('/:id', _productController.deleteProduct);

module.exports = router;