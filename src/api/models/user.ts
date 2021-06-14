import Pool from 'pg-pool';
import { Client, QueryResult } from 'pg';
import { inject, injectable } from 'tsyringe';

import { Logger } from 'winston';
import DatabasePool from '../util/databasePool';
import { User } from '../types/User';

@injectable()
export default class UserModel {
  constructor(@inject(DatabasePool) private dbPool: DatabasePool,
    @inject('logger') private logger: Logger) {
  }

  public async create(user: User): Promise<QueryResult> {
    const queryString = `INSERT INTO user (username, okta_id, email, phone_number first_name, last_name, created_date) 
                         VALUES ($1, $2, $3, $4 ,$5) RETURNING id`;
    const client = await this.dbPool.pool.connect();
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
    const queryString = 'SELECT * FROM user';
    const client = await this.dbPool.pool.connect();
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
