const { Router } = require('express');
const router = Router();

// Localhost + login
const login = require('./auth-routes');
router.use(login);

// Localhost + home
const home = require('./home-routes');
router.use(home);

const api = require('./api');
router.use(api);

module.exports = router;