import 'reflect-metadata';
import express from 'express';
import routes from './api/index';
import cors from 'cors';
import ConfigService from './api/config/config';
import okta from './api/config/okta';
import bodyParser from 'body-parser';
import { Logger } from 'winston';
import logInit from './api/services/logger';
import { container } from 'tsyringe';

async function startServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  await okta();
  await logInit();
  const config = new ConfigService();
  const logger: Logger = container.resolve('logger');
  app.use(config.prefix, routes());

  app.listen(config.port, () => {
    logger.info(`listening on port ${config.port}`);
  });
}

startServer();