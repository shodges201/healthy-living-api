import { injectable, inject } from 'tsyringe';
import CholesterolModel from '../models/cholesterol';
import { QueryResult } from 'pg';

@injectable()
export default class CholesterolService {
    private cholesterolModel: CholesterolModel;

    constructor(@inject(CholesterolModel) cholesterolModel: CholesterolModel){
        this.cholesterolModel = cholesterolModel;
    }
    public async createEntry(level: number, type: string) {
        // TODO use DI to inject Service and possibly model?
        const id = await this.cholesterolModel.createCholesterol(level, type);
    }
    public async getAll(type: string): Promise<QueryResult>{
        const result = await this.cholesterolModel.getAllCholesterol(type);
        console.log(result);
        return result;
    }
}