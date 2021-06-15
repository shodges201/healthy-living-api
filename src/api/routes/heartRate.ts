import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from 'winston';
import HeartRateService from '../services/heartRate';
import requireAuthentication from '../middleware/requireAuthentication';
import injectUser from '../middleware/injectUser';

const router = Router();
// TODO use tsyringe instead of typedi -> seems much more intuitive and well described
export default (appRouter: Router) => {
  appRouter.use('/heart-rate', router);
  const heartRateService = container.resolve(HeartRateService);
  const logger: Logger = container.resolve<Logger>('logger');

  router.get('/all', requireAuthentication, injectUser, async (req: any, res: Response) => {
    const result = await heartRateService.getAll(req.user.id);
    return res.json(result.rows);
  });
};
