const express = require('express');
const router = express.Router();

const { BrandsController } = require('../controllers/index.controller');
const _brandsController = new BrandsController();

router.get('/', _brandsController.getBrands);
router.get('/:id', _brandsController.getBrand);
router.post('/', _brandsController.createBrand);
router.put('/:id', _brandsController.updateBrand);
router.delete('/:id', _brandsController.deleteBrand);

module.exports = router;