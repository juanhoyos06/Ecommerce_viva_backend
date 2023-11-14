require('express');
const Product = require("../models/Products")
const pool = require('./conection.controller')

class ProductsController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async createProduct(req, res) {
        try {
            //TODO: Guardar las imagenes de los productos
            let payload = req.body;
            payload.name = payload.name.toUpperCase();
            
            const product = new Product(payload?.id, payload?.id_category, payload?.id_brand, payload?.name, payload?.img, payload?.price)
            product.valid();
            const query = 'CALL desarrollo.agregar_producto($1, $2, $3, $4, $5, $6, $7,$8);'
            await pool.query(query, [payload?.id_category, payload?.id_brand, payload?.name, payload?.img, payload?.price, payload?.id_shop,payload?.cant,payload?.address]);
            res.status(201).json({
                ok: true,
                message: "Producto creado",
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

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbproductos WHERE id_producto = $1 AND estado = '1'"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "El producto no se encontro." };
            }
            let payload = req.body
            payload.name = payload.name.toUpperCase();
            const product = new Product(payload?.id, payload?.id_category, payload?.id_brand, payload?.name, payload?.img, payload?.price, payload?.status)
            product.valid();
            const query = 'UPDATE desarrollo.tbproductos SET id_categoria = $1, id_marca = $2, nombre = $3, imagen = $4, precio = $5, estado = $6' +
                ' WHERE id_producto = $7';
            await pool.query(query, [payload?.id_category, payload?.id_brand, payload?.name, payload?.img, payload?.price, payload?.status, id]);
            res.status(200).json({
                ok: true,
                message: "Producto actualizado",
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

    async getProduct(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT * FROM desarrollo.tbproductos WHERE estado = '1' AND id_producto = $1";
            const response = await pool.query(query, [id]);


            if (response.rowCount === 0) {
                throw { status: 404, message: "El producto no se encontró." };
            }
            res.status(200).json({
                ok: true,
                message: "Informacion del producto",
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

    async getProducts(req, res) {
        try {
            const query = "SELECT * FROM desarrollo.view_info_productos";
            const response = await pool.query(query);
            res.status(200).json({
                ok: true,
                message: "Productos",
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

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbproductos WHERE id_producto = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "El producto no se encontro." };
            }
            const queryDelete = "UPDATE desarrollo.tbproductos SET estado = '0' WHERE id_producto = $1"
            await pool.query(queryDelete, [id]);
            res.status(200).json({
                ok: true,
                message: "Producto eliminado",
                info: {}
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

    async getProductCategory(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT p.id_producto, p.nombre, p.imagen, p.precio, m.nombre marca, c.nombre categoria, i.cantidad FROM desarrollo.tbproductos p "+
            "JOIN desarrollo.tbmarcas m ON p.id_marca = m.id_marca "+
            "JOIN desarrollo.tbcategorias c ON p.id_categoria = c.id_categoria "+
            "JOIN desarrollo.tbinventario i ON i.id_producto = p.id_producto "+
            "WHERE p.estado = '1' AND p.id_categoria = $1;";

            const response = await pool.query(query, [id]);


            if (response.rowCount === 0) {
                throw { status: 404, message: "El producto no se encontró." };
            }
            res.status(200).json({
                ok: true,
                message: "Informacion del producto",
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
    async getProductBrand(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT p.id_producto, p.nombre, p.imagen, p.precio, m.nombre marca, c.nombre categoria, i.cantidad FROM desarrollo.tbproductos p "+
            "JOIN desarrollo.tbmarcas m ON p.id_marca = m.id_marca "+
            "JOIN desarrollo.tbcategorias c ON p.id_categoria = c.id_categoria "+
            "JOIN desarrollo.tbinventario i ON i.id_producto = p.id_producto "+
            "WHERE p.estado = '1' AND p.id_marca = $1;";

            const response = await pool.query(query, [id]);


            // if (response.rowCount === 0) {
            //     throw { status: 404, message: "El producto no se encontró." };
            // }
            res.status(200).json({
                ok: true,
                message: "Informacion del¿ los productos",
                info: response.rows
            });
        } catch (error) {
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }
}
module.exports = ProductsController