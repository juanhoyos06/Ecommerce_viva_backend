require('express');
const pool = require('./conection.controller')

class UsersController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    createUser(req, res) {
        res.status(201).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    updateUser(req, res) {
        res.status(200).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    getUser(req, res) {
        res.status(200).json({
            ok: true,
            message: "",
            info: ""
        })
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async getUsers(req, res) {
        try {
            const response = await pool.query('SELECT * FROM desarrollo.tbproductos');
            res.status(200).json({
                ok: true,
                message: "Productos",
                info: response.rows
            });
        } catch (error) {
            console.error("Error en getProducts:", error);
            res.status(500).json({
                ok: false,
                message: "Error al obtener usuarios",
                info: null
            });
        }

    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    deleteUser(req, res) {
        res.status(204).json({
            ok: true,
            message: "",
            info: ""
        })
    }
}
module.exports = UsersController