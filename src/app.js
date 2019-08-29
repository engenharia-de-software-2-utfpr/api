const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

const api = require('./domains');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());

app.use('/api', api);

app.use((err, req, res, next) => {
  res.status(500).json({ message: 'SERVER_ERROR', data: err });
});

module.exports = app;
