require('express');
const Brands = require('../models/Brands');
const pool = require('./conection.controller')

class BrandsController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async createBrand(req, res) {
        try {
            let payload = req.body;
            const brand = new Brands(payload?.id, payload?.name, payload?.status)
            brand.valid();
            const query = 'INSERT INTO desarrollo.tbmarcas (nombre, estado)' +
                ' VALUES($1, $2)';
            await pool.query(query, [payload?.name, payload?.status]);
            res.status(201).json({
                ok: true,
                message: "Marca creada",
                info: payload
            })

        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });

        }
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async updateBrand(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbmarcas WHERE id_marca = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La marca no se encontró." };
            }
            let payload = req.body
            const brand = new Brands(payload?.id, payload?.name, payload?.status)
            brand.valid();
            const query = 'UPDATE desarrollo.tbmarcas SET nombre = $1, estado = $2' +
                ' WHERE id_marca = $3';
            await pool.query(query, [payload?.name, payload?.status, id]);
            res.status(200).json({
                ok: true,
                message: "Marca actualizado",
                info: payload
            })
        } catch (error) {
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });

        }
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async getBrand(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT * FROM desarrollo.tbmarcas WHERE estado = '1' AND id_marca = $1";
            const response = await pool.query(query, [id]);

            if (response.rowCount === 0) {
                throw { status: 404, message: "La marca no existe." };
            }
            res.status(200).json({
                ok: true,
                message: "Informacion de la marca",
                info: response.rows
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async getBrands(req, res) {
        try {
            const query = "SELECT * FROM desarrollo.tbmarcas WHERE estado = '1'";
            const response = await pool.query(query);
            res.status(200).json({
                ok: true,
                message: "Informacion de las marcas",
                info: response.rows
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }

    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async deleteBrand(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbmarcas WHERE id_marca = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La marca no se encontró." };
            }
            const queryDelete = "UPDATE desarrollo.tbmarcas SET estado = '0' WHERE id_marca = $1"
            await pool.query(queryDelete, [id]);
            res.status(200).json({
                ok: true,
                message: "Marca eliminada",
                info: {}
            })
        } catch (error) {
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });

        }
    }
}
module.exports = BrandsController