require('express');
const pool = require('./conection.controller')

class BrandsController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    createBrand(req, res) {
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

    updateBrand(req, res) {
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

    getBrand(req, res) {
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

    async getBrands(req, res) {
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

    deleteBrand(req, res) {
        res.status(204).json({
            ok: true,
            message: "",
            info: ""
        })
    }
}
module.exports = BrandsController