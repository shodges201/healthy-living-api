import 'reflect-metadata';
import express from 'express';
import routes from './api/index';
import cors from 'cors';
import ConfigService from './api/config/config';

async function startServer() {
  const app = express();
  const config = new ConfigService();
  console.log("api prefix: " + config.prefix);
  app.use(config.prefix, routes());
  app.use(cors());

  app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
  });
}

startServer();