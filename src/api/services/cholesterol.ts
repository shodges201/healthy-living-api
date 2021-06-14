import { injectable, inject } from 'tsyringe';
import { QueryResult } from 'pg';
import { Logger } from 'winston';
import CholesterolModel from '../models/cholesterol';

@injectable()
export default class CholesterolService {
  constructor(@inject(CholesterolModel) private cholesterolModel: CholesterolModel,
    @inject('logger') private logger:Logger) {
    this.cholesterolModel = cholesterolModel;
    this.logger = logger;
  }

  public async createEntry(level: number, type: string) {
    // TODO use DI to inject Service and possibly model?
    const id = await this.cholesterolModel.createCholesterol(level, type);
  }

  public async getAll(type: string): Promise<QueryResult> {
    const result = await this.cholesterolModel.getAllCholesterol(type);
    this.logger.info(result);
    return result;
  }
}
