import 'reflect-metadata';
import express from 'express';
import routes from './api/index';
import cors from 'cors';
import ConfigService from './api/config/config';
import okta from './api/config/okta';
import bodyParser from 'body-parser';
import logger from './api/services/logger';

async function startServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  await okta();
  await logger();
  const config = new ConfigService();
  console.log("api prefix: " + config.prefix);
  app.use(config.prefix, routes());

  app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
  });
}

startServer();