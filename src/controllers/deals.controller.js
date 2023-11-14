require('express');
const ConfigService = require("../services/ConfigService");
const config = new ConfigService();

const Deals = require('../models/Deals');
const pool = require('./conection.controller')

class DealsController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async createDeal(req, res) {
        try {
            let payload = req.body;
            const document = req.files.img;
            if (document) {
                document.mv(`./uploads/deals/${document.md5}${document.name}`);
                const host = config.get("api_host");
                const url = `${host}static/${document.md5}${document.name}`;
                payload.img = url
            } else {
                throw { status: 404, message: "El archivo no se encuentra" };
            }
            const deal = new Deals(payload?.id, payload?.id_shop, payload?.description, payload?.startDate, payload?.endDate, payload?.img, payload?.percentage, payload?.id_category)
            deal.valid();
            const query = 'INSERT INTO desarrollo.tbpromociones (id_tienda, descripcion, fecha_inicio, fecha_fin, imagen, porcentaje, id_categoria)' +
                ' VALUES($1, $2, $3, $4, $5, $6, $7)';
            await pool.query(query, [payload?.id_shop, payload?.description, payload?.startDate, payload?.endDate, payload?.img, payload?.percentage, payload?.id_category]);
            res.status(201).json({
                ok: true,
                message: "Promocion creada",
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

    async updateDeal(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbpromociones WHERE fecha_fin > current_date AND id_promocion = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La promocion no se encontro." };
            }
            let payload = req.body

            const deal = new Deals(payload?.id, payload?.id_shop, payload?.description, payload?.startDate, payload?.endDate, payload?.img, payload?.percentage, payload?.id_category)
            deal.valid();
            const query = 'UPDATE desarrollo.tbpromociones SET id_tienda = $1, descripcion = $2, fecha_inicio = $3, fecha_fin = $4, imagen = $5, porcentaje = $6, ' +
                'id_categoria = $7 WHERE id_promocion = $8';
            await pool.query(query, [payload?.id_shop, payload?.description, payload?.startDate, payload?.endDate, payload?.img, payload?.percentage, payload?.id_category, id]);
            res.status(200).json({
                ok: true,
                message: "Promocion actualizada",
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

    async getDeal(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT * FROM desarrollo.tbpromociones WHERE fecha_fin > current_date AND id_promocion = $1";
            const response = await pool.query(query, [id]);


            if (response.rowCount === 0) {
                throw { status: 404, message: "La promocion no se encontró." };
            }
            res.status(200).json({
                ok: true,
                message: "Informacion de la promocion",
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

    async getDeals(req, res) {
        try {
            const query = "SELECT * FROM desarrollo.tbpromociones WHERE fecha_fin > current_date;";
            const response = await pool.query(query);
            res.status(200).json({
                ok: true,
                message: "Promociones",
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

    async deleteDeal(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbpromociones WHERE fecha_fin > current_date AND id_promocion = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La promocion no se encontro." };
            }
            const queryDelete = "UPDATE desarrollo.tbpromociones SET fecha_fin = current_date-1 WHERE id_promocion = $1"
            await pool.query(queryDelete, [id]);
            res.status(200).json({
                ok: true,
                message: "Promocion eliminada",
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
module.exports = DealsController