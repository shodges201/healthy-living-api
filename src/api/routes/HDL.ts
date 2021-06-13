import { Router, Request, Response } from 'express';
import {container} from 'tsyringe';
import CholesterolService from '../services/cholesterol';
import { Logger } from 'winston';

const router = Router();
//TODO use tsyringe instead of typedi -> seems much more intuitive and well described
export default (appRouter: Router) => {
    appRouter.use('/hdl', router);
    const cholesterolService = container.resolve(CholesterolService);
    const logger: Logger = container.resolve<Logger>('logger');

    router.get('/all', async (req: Request, res: Response) => {
        const result = await cholesterolService.getAll('hdl');
        return res.json(result.rows);
    })

}
