const express = require('express');
const controller = require('./report.controller');

const router = express.Router();

router.post('/', controller.add);
router.get('/', controller.get);

module.exports = router;
