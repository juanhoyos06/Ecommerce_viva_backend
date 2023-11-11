const { Pool } = require('pg');

const pool = new Pool({
    host: 'ep-red-cake-06833267.us-east-2.aws.neon.fl0.io',
    user: 'fl0user',
    password: '7OqrhkzuMZQ5',
    database: 'Ecommerce',
    port: '5432',
    ssl: true

});

module.exports = pool