import { Router, Request, Response } from 'express';
import {container} from 'tsyringe';
import CholesterolService from '../services/cholesterol';

const router = Router();
//TODO use tsyringe instead of typedi -> seems much more intuitive and well described
export default (appRouter: Router) => {
    appRouter.use('/ldl', router);
    const cholesterolService = container.resolve(CholesterolService);

    router.get('/all', async (req: Request, res: Response) => {
        const result = await cholesterolService.getAll('ldl');
        return res.json(result.rows);
    })

}
