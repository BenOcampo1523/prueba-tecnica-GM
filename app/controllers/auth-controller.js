// Importar utils
const validateRequiredParams = require('../utils/validateRequiredParams');
const executeQuery = require('../utils/executeQuery');
const generateAccessToken = require('../utils/generateAccessToken');

const login = async (req, res) => {
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

        const token = generateAccessToken(results[0].id);

        res.cookie('access-token', token, {
            httpOnly: true,                 // (true): La cookie no es accessible desde JS
            maxAge: 3600 * 1000,            // Duración de la cookie (en ms)
            secure: false,                  // Hacer la cookie disponible independientemente si es o no HTTPS
            sameSite: 'lax',                // (lax): Restringir las cookies para uso entre sitios de terceros en contextos propios
        });

        return res.redirect('/home');

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    login
}