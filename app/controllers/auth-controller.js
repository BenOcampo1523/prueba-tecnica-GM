const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validateRequiredParams = require('../utils/validateRequiredParams');
const executeQuery = require('../utils/executeQuery');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        const missingParam = validateRequiredParams(req.body, ["username", "password"]);

        if (missingParam) return res.status(400).json({ error: missingParam });

        const results = await executeQuery(
            'SELECT * FROM users WHERE username = ? AND password = ?',
            [username, password],
        );

        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials.' });

        return res.status(200).send({ message: 'User logged in successfully', token: generateAccessToken(existingUser.id) });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    login
}