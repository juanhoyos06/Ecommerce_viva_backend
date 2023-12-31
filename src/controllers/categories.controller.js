require('express');
const Categories = require('../models/Categories');
const pool = require('./conection.controller')

class CategoriesController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async createCategory(req, res) {
        try {
            let payload = req.body;
            payload.name = payload.name.toUpperCase();
            const category = new Categories(payload?.id, payload?.name, payload?.status)
            category.valid();
            payload.status = 1;
            const query = 'INSERT INTO desarrollo.tbcategorias (nombre, estado)' +
                ' VALUES($1, $2)';
            await pool.query(query, [payload?.name, payload?.status]);
            res.status(201).json({
                ok: true,
                message: "Categoria creada",
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

    async updateCategory(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbcategorias WHERE id_categoria = $1 AND estado = '1'"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La categoria no se encontró." };
            }
            let payload = req.body
            payload.name = payload.name.toUpperCase();

            const category = new Categories(id, payload?.name, payload?.status)
            category.valid();
            const query = "UPDATE desarrollo.tbcategorias SET nombre = $1, estado = '1'" +
                " WHERE id_categoria = $2";
            await pool.query(query, [payload?.name,id]);
            res.status(200).json({
                ok: true,
                message: "Categoria actualizado",
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

    async getCategory(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT * FROM desarrollo.tbcategorias WHERE estado = '1' AND id_categoria = $1";
            const response = await pool.query(query, [id]);

            if (response.rowCount === 0) {
                throw { status: 404, message: "La categoria no existe." };
            }
            res.status(200).json({
                ok: true,
                message: "Informacion de la categoria",
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

    async getCategories(req, res) {
        try {
            const query = "SELECT * FROM desarrollo.tbcategorias WHERE estado = '1'";
            const response = await pool.query(query);
            res.status(200).json({
                ok: true,
                message: "Informacion de las categorias",
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
    async getCategoriesShop(req, res) {
        try {
            const query = "SELECT * FROM desarrollo.view_info_categorias_para_tiendas";
            const response = await pool.query(query);
            
            res.status(200).json({
                ok: true,
                message: "Informacion de las categorias",
                info: response.rows
            });
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

    async deleteCategory(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbcategorias WHERE id_categoria = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "La categoria no se encontró." };
            }
            const queryDelete = "UPDATE desarrollo.tbcategorias SET estado = '0' WHERE id_categoria = $1"
            await pool.query(queryDelete, [id]);
            res.status(200).json({
                ok: true,
                message: "Categoria eliminada",
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
module.exports = CategoriesController