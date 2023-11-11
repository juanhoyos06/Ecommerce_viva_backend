const express = require('express');
const router = express.Router();

const { ShopsController } = require('../controllers/index.controller');
const _shopsController = new ShopsController();

router.get('/', _shopsController.getShops);
router.get('/:id', _shopsController.getShop);
router.post('/', _shopsController.createShop);
router.put('/:id', _shopsController.updateShop);
router.delete('/:id', _shopsController.deleteShop);

module.exports = router;