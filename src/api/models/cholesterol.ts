import { QueryResult } from 'pg';
import { inject, injectable } from 'tsyringe';
import DatabasePool from '../util/databasePool';

@injectable()
export default class CholesterolModel {
  constructor(@inject(DatabasePool) private dbPool: DatabasePool) {
  }

  public async createCholesterol(id: number, level: number, type: string) {
    const queryString = `INSERT INTO ${type} (level, user_id) 
                             VALUES ($1, $2) RETURNING id`;
    const client = await this.dbPool.pool.connect();
    let result: any = null;
    try {
      result = await client.query(queryString, [level, id]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    return result.rows[0].id;
  }

  public async getAllCholesterol(id: number, type: string): Promise<QueryResult> {
    const queryString = `SELECT * FROM ${type} WHERE user_id = $1`;
    const client = await this.dbPool.pool.connect();
    let result: QueryResult;
    try {
      result = await client.query(queryString, [id]);
    } finally {
      client.release();
    }
    return result;
  }

  public async getCholesterolById(id: number, userId: number, type: string): Promise<QueryResult> {
    const queryString = `SELECT * FROM ${type} WHERE user_id = $1 AND id = $2`;
    const client = await this.dbPool.pool.connect();
    let result: QueryResult;
    try {
      result = await client.query(queryString, [userId, id]);
    } finally {
      client.release();
    }
    return result;
  }
}
