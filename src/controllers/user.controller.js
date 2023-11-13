require('express');
const { generateHash } = require("../services/Bcrypt");
const ConfigService = require("../services/ConfigService");
const User = require('../models/Users')
const pool = require('./conection.controller')
const config = new ConfigService();


class UsersController {

    /**
     * 
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     */

    async createUser(req, res) {
        try {
            //TODO: Guardar las imagenes de los usuarios
            let payload = req.body;
            payload.password = await generateHash(payload.password);
            const querySelect = "SELECT count(*) FROM desarrollo.tbusuarios WHERE correo = $1 AND estado = '1'"
            const response = await pool.query(querySelect, [payload?.email]);
            const count = response.rows[0].count;
            if (count > 0) {
                throw { status: 404, message: "Ya existe un usuario con ese correo" };
            }
            const user = new User(payload?.id, payload?.id_rol, payload?.name, payload?.img, payload?.email, payload?.password, payload?.status)
            user.valid();
            const query = 'INSERT INTO desarrollo.tbusuarios (id_rol, nombre, imagen, correo, contrasenia, estado)' +
                ' VALUES($1, $2, $3, $4, $5, $6)';
            await pool.query(query, [payload?.id_rol, payload?.name, payload?.img, payload?.email, payload?.password, payload?.status]);
            res.status(201).json({
                ok: true,
                message: "Usuario creado",
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

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbusuarios WHERE id_usuario = $1 AND estado = '1'"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "El usuario no se encontró." };
            }
            let payload = req.body
            payload.password = await generateHash(payload.password);
            const user = new User(payload?.id, payload?.id_rol, payload?.name, payload?.img, payload?.email, payload?.password, payload?.status)
            user.valid();
            const query = 'UPDATE desarrollo.tbusuarios SET id_rol = $1, nombre = $2, imagen = $3, correo = $4, contrasenia = $5, estado = $6' +
                ' WHERE id_usuario = $7';
            await pool.query(query, [payload?.id_rol, payload?.name, payload?.img, payload?.email, payload?.password, payload?.status, id]);
            res.status(200).json({
                ok: true,
                message: "Usuario actualizado",
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

    async getUser(req, res) {
        try {
            const id = req.params.id;
            const query = "SELECT * FROM desarrollo.tbusuarios WHERE estado = '1' AND id_usuario = $1";
            const response = await pool.query(query, [id]);


            if (response.rowCount === 0) {
                throw { status: 404, message: "El usuario no se encontró." };
            }
            res.status(200).json({
                ok: true,
                message: "Informacion del usuario",
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

    async getUsers(req, res) {
        try {
            const query = "SELECT * FROM desarrollo.tbusuarios WHERE estado = '1'";
            const response = await pool.query(query);
            res.status(200).json({
                ok: true,
                message: "usuarios",
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

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const querySelect = "SELECT count(*) FROM desarrollo.tbusuarios WHERE id_usuario = $1"
            const response = await pool.query(querySelect, [id]);
            const count = response.rows[0].count;
            if (count == 0) {
                throw { status: 404, message: "El usuario no se encontro." };
            }
            const queryDelete = "UPDATE desarrollo.tbusuarios SET estado = '0' WHERE id_usuario = $1"
            await pool.query(queryDelete, [id]);
            res.status(200).json({
                ok: true,
                message: "Usuario eliminado",
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
    async createImageProfile(req, res) {
        try {
            
            const document = req.files.document;
            if (document) {
                document.mv(`./uploads/users/${document.md5}${document.name}`);
                const host = config.get("api_host");
                const url = `${host}static/${document.md5}${document.name}`;
                res.status(200).json({
                    ok: true,
                    message: "Imagen del usuario guardado",
                    info: url,
                });
            }
            throw { status: 400 }
        } catch (error) {
            console.error(error);
            res.status(error?.status || 500).json({
                ok: false,
                message: error?.message || error,
            });
        }
    }


}
module.exports = UsersController