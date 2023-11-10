const { Pool } = require('pg');

const pool = new Pool({
    host: 'ep-red-cake-06833267.us-east-2.aws.neon.fl0.io',
    user: 'fl0user',
    password: '7OqrhkzuMZQ5',
    database: 'Ecommerce',
    port: '5432',
    ssl: true

});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM desarrollo.tbusuarios')
    res.status(200).json(response.rows)
}

const createUser = async(req, res) => {

}
module.exports = {
    getUsers,
    createUser,
}