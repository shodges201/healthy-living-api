import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Logger } from 'winston';
import { container } from 'tsyringe';
import routes from './api/index';
import ConfigService from './api/config/config';
import okta from './api/config/okta';
import logInit from './api/services/logger';

async function startServer() {
  const app = express();
  app.use(express.json());
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
