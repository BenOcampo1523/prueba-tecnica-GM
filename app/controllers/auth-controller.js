const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const { createTable, checkRecordExists, insertRecord } = require("../utils/sqlFunctions");
const mysql = require('mysql');

const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res
            .status(400)
            .json({ error: "E-mail or password fields cannot be empty." });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const user = {
        userId: uuidv4(),
        email,
        password: hashedPass
    };
    try {
        await createTable(userSchema);
        const userAlreadyExists = await checkRecordExists("users", "email", email);
        if (userAlreadyExists) {
            res.status(409).json({ error: "E-mail already exists." });
        } else {
            await insertRecord("users", user);
            res.status(201).json({ message: "User created successfully." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "E-mail or password fields cannot be empty." });
    }

    const pool = mysql.createPool({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        insecureAuth: true
    });

    const result = pool.query(`SELECT * FROM accounts WHERE username=${email} AND password=${password}`);
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
    register,
    login
}