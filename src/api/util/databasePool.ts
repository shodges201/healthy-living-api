import Pool from 'pg-pool';
import { singleton, inject } from "tsyringe";
import ConfigService from '../config/config';
import { Client } from 'pg';
import { PoolConfig } from 'pg';

@singleton()
export default class DatabasePool {

  private readonly config: ConfigService;
  private readonly dbConfig: PoolConfig;
  public pool: Pool<Client>;

  constructor(@inject(ConfigService) config: ConfigService) {
    this.config = config;
    this.dbConfig = {
      user: config.db.user,
      password: config.db.password,
      host: config.db.hostname,
      port: config.db.port,
      database: config.db.name,
      ssl: false
    };
    this.pool = new Pool(this.dbConfig);
  }
}
