const jwt = require("jsonwebtoken");

/**
 * Generate Access Token
 * @param {string} userId
 * @returns {string} token
 */
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateAccessToken;