require('express');
const Shops = require('../models/Shop');
const pool = require('./conection.controller')

class ShopsController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async createShop(req, res) {
        try {
            let payload = req.body;
            const shop = new Shops(payload?.id, payload?.name, payload?.img, payload?.webSite, payload?.phone, payload?.status)
            shop.valid();
            const query = 'INSERT INTO desarrollo.tbtiendas (nombre, imagen, sitio_web, telefono, estado)' +
                ' VALUES($1, $2, $3, $4, $5)';
            await pool.query(query, [payload?.name, payload?.img, payload?.webSite, payload?.phone, payload?.status]);
            res.status(201).json({
                ok: true,
                message: "Tienda creada",
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

    async updateShop(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbtiendas WHERE id_tienda = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La tienda no se encontró." };
            }
            let payload = req.body
            const shop = new Shops(payload?.id, payload?.name, payload?.img, payload?.webSite, payload?.phone, payload?.status)
            shop.valid();
            const query = 'UPDATE desarrollo.tbtiendas SET nombre = $1, imagen = $2, sitio_web = $3, telefono = $4, estado = $5' +
                ' WHERE id_tienda = $6';
            await pool.query(query, [payload?.name, payload?.img, payload?.webSite, payload?.phone, payload?.status, id]);
            res.status(200).json({
                ok: true,
                message: "Tienda actualizado",
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

    async getShop(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT * FROM desarrollo.tbtiendas WHERE estado = '1' AND id_tienda = $1";
            const response = await pool.query(query, [id]);

            if (response.rowCount === 0) {
                throw { status: 404, message: "La tienda no se encontró." };
            }
            res.status(200).json({
                ok: true,
                message: "Informacion de la tienda",
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

    async getShops(req, res) {
        try {
            const query = "SELECT * FROM desarrollo.tbtiendas WHERE estado = '1'";
            const response = await pool.query(query);
            res.status(200).json({
                ok: true,
                message: "Tiendas",
                info: response.rows
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                message: "Error al obtener todos las tiendas",
                info: null
            });
        }

    }
    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async deleteShop(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbtiendas WHERE id_tienda = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La tienda no se encontró." };
            }
            const queryDelete = "UPDATE desarrollo.tbtiendas SET estado = '0' WHERE id_tienda = $1"
            await pool.query(queryDelete, [id]);
            res.status(200).json({
                ok: true,
                message: "Tienda eliminada",
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
module.exports = ShopsController