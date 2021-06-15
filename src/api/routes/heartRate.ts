import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from 'winston';
import HeartRateService from '../services/heartRate';
import requireAuthentication from '../middleware/requireAuthentication';
import injectUser from '../middleware/injectUser';

const router = Router();

export default (appRouter: Router) => {
  appRouter.use('/heart-rate', router);
  const heartRateService = container.resolve(HeartRateService);
  const logger: Logger = container.resolve<Logger>('logger');

  router.get('/all', requireAuthentication, injectUser, async (req: any, res: Response) => {
    const result = await heartRateService.getAll(req.user.id);
    return res.json(result.rows);
  });

  router.post('', requireAuthentication, injectUser, async (req: any, res: Response) => {
    if (!req.body.rate) {
      return res.sendStatus(400);
    }
    if (!req.user) {
      return res.sendStatus(401);
    }
    const entryId: number = await heartRateService.create(req.user.id, req.body.rate);
    res.location(`${req.protocol}://${req.get('host')}${req.originalUrl}${entryId}`);
    return res.sendStatus(201);
  });
};
