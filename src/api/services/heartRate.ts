import { injectable, inject } from 'tsyringe';
import { QueryResult } from 'pg';
import { Logger } from 'winston';
import HeartRateModel from '../models/HeartRate';

@injectable()
export default class HeartRateService {
  constructor(@inject(HeartRateModel) private cholesterolModel: HeartRateModel,
    @inject('logger') private logger:Logger) {
  }

  /**
   * Returns the id of the created resource in the database
   * @param id current user's id
   * @param rate new heart rate level
   * @returns id:number
   */
  public async create(id:number, rate: number): Promise<number> {
    return this.cholesterolModel.create(id, rate);
  }

  public async getById(id: number, userId: number): Promise<QueryResult> {
    const result = await this.cholesterolModel.getHeartRateById(id, userId);
    this.logger.info(JSON.stringify(result.rows));
    return result;
  }

  public async getAll(id: number): Promise<QueryResult> {
    return this.cholesterolModel.getAll(id);
  }
}
