const express = require('express');
const router = express.Router();

const { UsersController } = require('../controllers/index.controller');
const _UsersController = new UsersController();

router.get('/', _UsersController.getUsers);
router.get('/infoCar/:id', _UsersController.getNumberCar);
router.get('/productsCar/:id', _UsersController.getProductsCar);
router.get('/:id', _UsersController.getUser);
router.post('/carrito/', _UsersController.addCarrito);
router.post('/', _UsersController.createUser);
router.put('/:id', _UsersController.updateUser);
router.delete('/:id', _UsersController.deleteUser);

// router.post('/:id/image_profile', _UsersController.createImageProfile);


module.exports = router;