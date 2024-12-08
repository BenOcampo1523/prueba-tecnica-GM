const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysqlConnection = require('../db/db');
const validateRequiredParams = require('../utils/validateRequiredParams')

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const login = async (req, res) => {

    const { email, password } = req.body;

    const missingParam = validateRequiredParams(req.body, ["email", "password"]);

    if (missingParam) return res.status(400).json({ error: missingParam });

    const connection = mysqlConnection;
    const result = connection.query(`SELECT * FROM accounts;`);
    //const result = connection.query(`SELECT * FROM accounts WHERE username='${email}' AND password='${password}'`);
    console.log(result);

    try {
        if (existingUser) {
            if (!existingUser.password) {
                return res.status(401).json({ error: "Invalid credentials." });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (passwordMatch) {
                return res.status(200).json({
                    userId: existingUser.userId,
                    email: existingUser.email,
                    access_token: generateAccessToken(existingUser.userId),
                });
            } else {
                return res.status(401).json({ error: "Invalid credentials. " });
            }
        } else {
            return res.status(401).json({ error: "Invalid credentials. " });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    login
}