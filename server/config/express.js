'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

module.exports = (app) => {
  app.use(morgan('combined'));
  app.use(cors());
  app.use(bodyParser.json({ type: '*/*' }));
};
