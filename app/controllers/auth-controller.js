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

        const queryConsult = new Promise((resolve, reject) => connection.query(
            `SELECT * FROM accounts WHERE username=${username} AND password=${password};`,
            (error, results, _) => {
                if (error) reject(new Error('Invalid credentials.'));
                if (results.length === 0) reject(new Error('Invalid credentials.'));

                resolve(results[0]);
            }
        ));

        const existingUser = await queryConsult;

        if (!existingUser) return res.status(401).json({ error: 'Invalid credentials.' });

        return res.status(200).send({ message: 'User logged in successfully', token: generateAccessToken(existingUser.id) });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    login
}