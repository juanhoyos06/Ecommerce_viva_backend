require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const { createToken, verifyToken } = require("../services/JwtService")
const { compareHash } = require("../services/Bcrypt");
const pool = require('./conection.controller')


class AuthController {

    constructor() { }


    /**
  *
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            

            // VALIDAR email & password
            const result = await pool.query("SELECT * FROM desarrollo.tbusuarios WHERE correo = $1", [email.toUpperCase()]);
            
            if (result.rows.length === 0) {
                throw { status: 404, message: "El usuario no se encontró." };
            }

            const user = result.rows[0];

            const passwordEquals = await compareHash(password, user.contrasenia);

            if (!passwordEquals) {
                throw { status: 404, message: "La contraseña no es válida." };
            }
            // // CREAR TOKEN
            delete user.contrasenia;
            const token = createToken(user);
            res.status(200).json({
                ok: true,
                message: "Usuario consultado",
                info: { ...user, token },
            });
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }
    async verifyToken(req, res) {
        try {
            const { token } = req.body;
            const user = verifyToken(token);
            if (!user) {
                throw { status: 400, message: "Erro verificando el token." };
            }

  
            res.status(200).json({
                ok: true,
                message: "Token verificado",
                info: { ...user },
            });
        } catch (error) {
            if (error instanceof TokenExpiredError){
                return res.status(400).json({
                    ok: false,
                    message: 'Token no valido',
                });
            }
            return res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }


}

module.exports = AuthController