// Importar utils
const validateRequiredParams = require('../utils/validateRequiredParams');
const executeQuery = require('../utils/executeQuery');

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
            httpOnly: true,
            maxAge: 3600 * 1000,
            secure: false,
            sameSite: 'lax',
        });

        return res.redirect('/home');

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    login
}