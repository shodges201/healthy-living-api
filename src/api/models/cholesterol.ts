import Pool from 'pg-pool';
import DatabasePool from '../util/databasePool';
import { Client } from 'pg';
import { inject, injectable } from "tsyringe";
import { QueryResult } from 'pg';

@injectable()
export default class CholesterolModel {

  constructor(@inject(DatabasePool) private dbPool: DatabasePool) {
  }

  public async createCholesterol(level: number, type: string) {
    const queryString = `INSERT INTO ${type} (level, date) 
                             VALUES ($1, $2) RETURNING id`;
    const client = await this.dbPool.pool.connect();
    let result: any = null;
    try {
      result = await client.query(queryString, [level, new Date().getDate()]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    return result.rows[0].id;
  }

  public async getAllCholesterol(type: string): Promise<QueryResult> {
    const queryString = `SELECT * FROM ${type}`;
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