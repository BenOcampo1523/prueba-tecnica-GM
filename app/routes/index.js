const { Router } = require('express');
const { authorization } = require('../middleware/authorization');
const router = Router();

// Localhost + login
const login = require('./auth-routes');
router.use('/login', login);

// Localhost + home
const home = require('./home-routes');
router.use('/home', authorization, home);

const api = require('./api');
router.use('/api', api);

module.exports = router;