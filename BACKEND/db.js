const { Pool } = require("pg");

const pool = new Pool({
    user: 'postgres',
    password: 'duy123',
    host: 'localhost',
    port: 5432,
    database: 'quanlynhanvien'
});

module.exports = pool;