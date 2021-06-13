import Pool from 'pg-pool';
import DatabasePool from '../util/databasePool';
import { Client } from 'pg';
import { inject, injectable } from "tsyringe";
import { QueryResult } from 'pg';
import { User } from '../types/User';
import { Logger } from 'winston';

@injectable()
export default class UserModel {
  private dbPool: Pool<Client>;
  private logger: Logger;

  constructor(@inject(DatabasePool) dbPool: DatabasePool,
              @inject('logger') logger: Logger) {
    this.dbPool = dbPool.pool;
    this.logger = logger;
  }

  public async create(user: User): Promise<QueryResult> {
    const queryString = `INSERT INTO user (username, okta_id, email, phone_number firstName, lastName, created_date) 
                         VALUES ($1, $2, $3, $4 ,$5) RETURNING id`;
    const client = await this.dbPool.connect();
    try {
        const result: QueryResult = await client.query(queryString, [user.username, 
        user.email, user.firstName, user.lastName, user.createdDate]);
        await client.query('COMMIT');
        return result.rows[0].id;
    } catch (error) {
        await client.query('ROLLBACK');
        this.logger.error(error.message);
        this.logger.error('Rolling back create user transaction');
        throw error;
    } finally {
      client.release();
    }
  }

  public async getAll(): Promise<QueryResult> {
    const queryString = `SELECT * FROM user`;
    const client = await this.dbPool.connect();
    let result: QueryResult;
    try {
      result = await client.query(queryString);
    } catch (error) {
        this.logger.error('Error getting all users');
        this.logger.error(error.message);
        throw error;
    } finally {
        client.release();
    }
    return result;
  }
}