import { injectable, inject } from 'tsyringe';
import { QueryResult } from 'pg';
import HeartRateModel from '../models/HeartRate';

@injectable()
export default class HeartRateService {
    private cholesterolModel: HeartRateModel;

    constructor(@inject(HeartRateModel) cholesterolModel: HeartRateModel){
        this.cholesterolModel = cholesterolModel;
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