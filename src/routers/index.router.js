const express = require('express');
const router = express.Router();


const userRouter = require('./users.router')
const shopRouter = require('./shops.router')
const productRouter = require('./products.router')
const dealRouter = require('./deals.router')
const categoryRouter = require('./categories.router')
const brandRouter = require('./brands.router')
const AuthController = require('../controllers/auth.controller');
const { AuthMiddleware } = require('../middleware/auth.middleware');
const authController = new AuthController()

router.post('/login', authController.login)
router.use(AuthMiddleware)

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/shops', shopRouter)
router.use('/deals', dealRouter)
router.use('/categories', categoryRouter)
router.use('/brands', brandRouter)
router.post('/verify', authController.verifyToken)

router.use((req, res) =>{
    return res.status(404).json({
        ok: false,
        message: "404 endpoint no existe"
    });
});
module.exports = router