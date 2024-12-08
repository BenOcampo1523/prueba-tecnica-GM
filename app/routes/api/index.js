const { Router } = require('express');
const router = Router();

const login = require('./auth-api');
router.use('/api', login);

module.exports = router;