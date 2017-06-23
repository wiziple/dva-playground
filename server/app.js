'use strict';

import express from 'express';
import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;
const app = express();

require('./config/express').default(app);
require('./config/routes').default(app);

function connect() {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.mongodb, options).connection;
}

connect()
.on('error', console.log)
.on('disconnected', connect)
.once('open', listen);

function listen() {
  const port = process.env.PORT || 8001;

  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log(`Express app started on port ${port}`);
}
