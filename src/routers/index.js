const express = require('express');
const router = express.Router();


const userRouter = require('./users.router')
const productRouter = require('./products.router')

router.use('/products', productRouter)
router.use('/users', userRouter)

module.exports = router