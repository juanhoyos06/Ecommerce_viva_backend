const express = require('express');
const router = express.Router();


const userRouter = require('./users.router')
const shopRouter = require('./shops.router')
const productRouter = require('./products.router')
const dealRouter = require('./deals.router')
const categoryRouter = require('./categories.router')

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/shops', shopRouter)
router.use('/deals', dealRouter)
router.use('/categories', categoryRouter)

module.exports = router