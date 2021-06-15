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

  public async create(id: number, level: number, type: string) {
    // TODO use DI to inject Service and possibly model?
    return this.cholesterolModel.createCholesterol(id, level, type);
  }

  public async getById(id: number, userId: number, type: string): Promise<QueryResult> {
    const result = await this.cholesterolModel.getCholesterolById(id, userId, type);
    this.logger.info(JSON.stringify(result.rows));
    return result;
  }

  public async getAll(id: number, type: string): Promise<QueryResult> {
    const result = await this.cholesterolModel.getAllCholesterol(id, type);
    this.logger.info(result);
    return result;
  }
}
