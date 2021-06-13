import Pool from 'pg-pool';
import DatabasePool from '../util/databasePool';
import { Client } from 'pg';
import { inject, injectable } from "tsyringe";
import { QueryResult } from 'pg';

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

  public async getAll(): Promise<QueryResult> {
    const queryString = `SELECT * FROM heart_rate`;
    const client = await this.dbPool.pool.connect();
    let result: QueryResult;
    try {
      result = await client.query(queryString);
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
    return result;
  }
}