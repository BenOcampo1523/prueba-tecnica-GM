const mysqlConnection = require('../db/db');

/**
 * Execute a query on the database connection
 * @param {string} query - The query to execute
 * @param {Array} params - The parameters to pass to the query
 * @returns {Promise} The result of the query
 */
const executeQuery = async (query, params) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, params, (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    });
}

module.exports = executeQuery;