const express = require('express');
const router = express.Router();

const { UsersController } = require('../controllers/index.controller');
const _UsersController = new UsersController();

router.get('/', _UsersController.getUsers);
router.get('/:id', _UsersController.getUser);
router.post('/', _UsersController.createUser);
router.put('/:id', _UsersController.updateUser);
router.delete('/:id', _UsersController.deleteUser);

module.exports = router;