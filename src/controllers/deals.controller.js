require('express');
const ConfigService = require("../services/ConfigService");
const config = new ConfigService();

const Deals = require('../models/Deals');
const pool = require('./conection.controller')

class DealsController {

    static async getIdcategory(name) {
        const query = "SELECT id_categoria FROM desarrollo.tbcategorias WHERE nombre = $1";
        const response = await pool.query(query, [name]);
        return response.rows[0].id_categoria;
    }
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
            //Este id_user viene desde el front 
            payload.id_category = await DealsController.getIdcategory(payload.id_category)

            const response_id_shop = await pool.query('SELECT id_tienda FROM desarrollo.tbadmintiendas WHERE id_usuario = $1', [payload.id_user])
            const id_shop = response_id_shop.rows[0].id_tienda
            const deal = new Deals(payload?.id, id_shop, payload?.id_category, payload?.description, payload?.startDate, payload?.endDate, payload?.img, payload?.percentage)
            deal.valid();
            //La fecha viene en el mismo formato
            const query = 'CALL desarrollo.agregar_promocion($1, $2, $3, $4, $5, $6, $7)';
            await pool.query(query, [id_shop, payload?.id_category, payload?.description, payload?.startDate, payload?.endDate, payload?.img, payload?.percentage]);
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
            const response_id_shop = await pool.query('SELECT id_tienda FROM desarrollo.tbadmintiendas WHERE id_usuario = $1', [payload.id_user])
            const id_shop = response_id_shop.rows[0].id_tienda
            payload.id_category = await DealsController.getIdcategory(payload.id_category);
            const deal = new Deals(payload?.id, id_shop, payload?.id_category, payload?.description, payload?.startDate, payload?.endDate, payload?.img, payload?.percentage,)
            deal.valid();
            const query = 'UPDATE desarrollo.tbpromociones SET id_tienda = $1, descripcion = $2, fecha_inicio = $3, fecha_fin = $4, porcentaje = $5, ' +
                'id_categoria = $6 WHERE id_promocion = $7';
            await pool.query(query, [id_shop, payload?.description, payload?.startDate, payload?.endDate, payload?.percentage, payload?.id_category, id]);
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

    async getInfoDeals(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT p.descripcion, c.nombre categoria, p.fecha_inicio, p.fecha_fin, p.porcentaje  FROM desarrollo.tbpromociones p "+
            "JOIN desarrollo.tbcategorias c ON p.id_categoria = c.id_categoria " +
            "WHERE p.id_promocion = $1;"
            const response = await pool.query(query, [id]);
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