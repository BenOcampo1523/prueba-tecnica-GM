const express = require("express");
const path = require("path");
const router = express.Router();

const currentDir = process.cwd();

router.use("/", function(req,res) {
    res.sendFile(path.resolve(__dirname, `${currentDir}/public/home.html`));
})

module.exports = router;