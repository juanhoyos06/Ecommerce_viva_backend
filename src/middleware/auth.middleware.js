const { verifyToken } = require('../services/JwtService');

require('express')
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 */
const AuthMiddleware = (req, res, next) => {
    try {
        console.log(req.headers);
        const {authorization} = req.headers;
        const token = authorization?.split(" ")[1];
        const user = verifyToken(token);
        req.user = user;
        next();
        
    } catch (error) {

        res.status(400).json({
            ok: false,
            message: 'Error Auth Middleware'
        })
    }
}

module.exports = {AuthMiddleware}