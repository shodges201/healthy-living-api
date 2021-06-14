import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from 'winston';
import HeartRateService from '../services/heartRate';

const router = Router();
// TODO use tsyringe instead of typedi -> seems much more intuitive and well described
export default (appRouter: Router) => {
  appRouter.use('/heart-rate', router);
  const heartRateService = container.resolve(HeartRateService);
  const logger: Logger = container.resolve<Logger>('logger');

  router.get('/all', async (req: Request, res: Response) => {
    const result = await heartRateService.getAll();
    return res.json(result.rows);
  });
};
