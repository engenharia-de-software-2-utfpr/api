const express = require('express');
const report = require('./report');
const user = require('./user');

const router = express.Router();

router.use('/report', report.routes);
router.use('/user', user.routes);

module.exports = router;
