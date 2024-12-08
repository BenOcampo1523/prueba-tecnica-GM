const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const currentDir = process.cwd();

// Importar utils
const validateRequiredParams = require('../utils/validateRequiredParams');
const executeQuery = require('../utils/executeQuery');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const login = async (req, res, next) => {
    try {
        // Obtener datos del body (username, password)
        const { username, password } = req.body;
        // Validación de strings del body
        const missingParam = validateRequiredParams(req.body, ["username", "password"]);
        
        if (missingParam) return res.status(400).send({ error: missingParam });

        const results = await executeQuery(
            'SELECT * FROM accounts WHERE username = ? AND password = ?',
            [username, password],
        );

        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials.' });

        res.redirect('/home');
        next();
        
        //res.sendFile(path.resolve(__dirname, `${currentDir}/public/home.html`));
//        return res.status(200).send({ message: 'User logged in successfully', token: generateAccessToken(results[0].id) });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    login
}