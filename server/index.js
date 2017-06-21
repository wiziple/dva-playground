const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const router = require('./router');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();
mongoose.Promise = global.Promise;

function connect() {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.mongodb, options).connection;
}

connect()
.on('error', console.log)
.on('disconnected', connect)
.once('open', listen);

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
require('./config/routes')(app);

function listen() {
  const port = process.env.PORT || 8001;

  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log(`Express app started on port ${port}`);
}
