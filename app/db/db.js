const mysql = require("mysql");
const config = require("./config");
const createUserTable = require("../schemas/userSchema");

const connectDB = async () => {
    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        insecureAuth: true
    });

    pool.getConnection((err) => {
        try {
            if (err) {
                console.log({ error: err.message });
            }

            console.log("Connected to MySQL database");
        } catch (error) {
            console.error(error);
        }
    });

    pool.query(createUserTable, function (error, results, fields) {
        if (error) throw error;
        console.log('Solución: ', results);
    });
};

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'login-info',
    insecureAuth: true,
});

module.exports = mysqlConnection;