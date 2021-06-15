import { QueryResult } from 'pg';
import { inject, injectable } from 'tsyringe';
import DatabasePool from '../util/databasePool';

@injectable()
export default class HeartRateModel {
  constructor(@inject(DatabasePool) private dbPool: DatabasePool) {
  }

  public async create(rate: number): Promise<QueryResult> {
    const queryString = `INSERT INTO heart_rate (rate, date) 
                             VALUES ($1, $2) RETURNING id`;
    const client = await this.dbPool.pool.connect();
    let result: QueryResult;
    try {
      result = await client.query(queryString, [rate, new Date().getDate()]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    return result.rows[0].id;
  }

  public async getAll(id: number): Promise<QueryResult> {
    const queryString = 'SELECT * FROM heart_rate WHERE user_id = $1';
    const client = await this.dbPool.pool.connect();
    let result: QueryResult;
    try {
      result = await client.query(queryString, [id]);
    } finally {
      client.release();
    }
    return result;
  }
}
