const express = require("express");
const { login } = require("../controllers/auth-controller");
const path = require("path");
const router = express.Router();

const currentDir = process.cwd();

router.use("/login", function(req,res) {
    res.sendFile(path.resolve(__dirname, `${currentDir}/public/login.html`));
})

router.post("/login", login);

module.exports = router;