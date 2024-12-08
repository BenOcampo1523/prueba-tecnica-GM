const { Router } = require('express');
const router = Router();

const login = require('./auth-api');
router.use('/login', (req,res,next) => {

}, login);

module.exports = router;