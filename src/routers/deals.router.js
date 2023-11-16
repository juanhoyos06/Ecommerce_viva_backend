const express = require('express');
const router = express.Router();

const { DealsController } = require('../controllers/index.controller');
const _dealController = new DealsController();

router.get('/', _dealController.getDeals);
router.get('/info/:id', _dealController.getInfoDeals);
router.get('/:id', _dealController.getDeals);
router.post('/', _dealController.createDeal);
router.put('/:id', _dealController.updateDeal);
router.delete('/:id', _dealController.deleteDeal);

module.exports = router;