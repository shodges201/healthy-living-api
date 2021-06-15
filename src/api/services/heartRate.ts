import { injectable, inject } from 'tsyringe';
import { QueryResult } from 'pg';
import { Logger } from 'winston';
import HeartRateModel from '../models/HeartRate';

@injectable()
export default class HeartRateService {
  constructor(@inject(HeartRateModel) private cholesterolModel: HeartRateModel,
    @inject('logger') private logger:Logger) {
  }

  public async createEntry(rate: number, type: string) {
    // TODO use DI to inject Service and possibly model?
    const id = await this.cholesterolModel.create(rate);
  }

  public async getAll(id: number): Promise<QueryResult> {
    return await this.cholesterolModel.getAll(id);
  }
}
