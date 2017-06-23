'use strict';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

export default function (app) {
  app.use(morgan('combined'));
  app.use(cors());
  app.use(bodyParser.json({ type: '*/*' }));
}
