import { injectable, inject } from 'tsyringe';
import { QueryResult } from 'pg';
import HeartRateModel from '../models/HeartRate';
import { Logger } from 'winston';

@injectable()
export default class HeartRateService {

    constructor(@inject(HeartRateModel) private cholesterolModel: HeartRateModel,
                @inject('logger') private logger:Logger){
    }
    public async createEntry(rate: number, type: string) {
        // TODO use DI to inject Service and possibly model?
        const id = await this.cholesterolModel.create(rate);
    }
    public async getAll(): Promise<QueryResult> {
        const result = await this.cholesterolModel.getAll();
        return result;
    }
}