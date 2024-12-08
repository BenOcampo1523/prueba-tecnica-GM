const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysqlConnection = require('../db/db');
const validateRequiredParams = require('../utils/validateRequiredParams')

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const missingParam = validateRequiredParams(req.body, ["username", "password"]);

        if (missingParam) return res.status(400).send({ error: missingParam });

        const connection = mysqlConnection;

        let existingUser = false;

        connection.query(
            `SELECT * FROM accounts WHERE username=${username} AND password=${password};`,
            (error, results, _) => {
                if (error) return res.status(500).send({ error: error.message });
                if (results.length === 0) return res.status(401).send({ error: 'Invalid credentials.' });

                existingUser = results[0];
            }
        );

        return res.status(200).send({ message: 'User logged in successfully', token: generateAccessToken(existingUser.id) });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    login
}