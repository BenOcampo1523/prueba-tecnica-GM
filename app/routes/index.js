const { Router } = require('express');
const router = Router();

const auth = require('./auth-routes');

router.use('/api', auth);

module.exports = router;