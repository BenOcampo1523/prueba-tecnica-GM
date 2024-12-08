const express = require("express");
const { login } = require("../controllers/auth-controller");
const path = require("path");
const router = express.Router();

router.get("/login", function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

router.post("/login", login);

module.exports = router;