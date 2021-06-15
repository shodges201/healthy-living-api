import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from 'winston';
import CholesterolService from '../services/cholesterol';
import requireAuthentication from '../middleware/requireAuthentication';
import injectUser from '../middleware/injectUser';

const router = Router();
// TODO use tsyringe instead of typedi -> seems much more intuitive and well described
export default (appRouter: Router) => {
  appRouter.use('/hdl', router);
  const cholesterolService = container.resolve(CholesterolService);
  const logger: Logger = container.resolve<Logger>('logger');

  router.get('/all', requireAuthentication, injectUser, async (req: any, res: Response) => {
    if (!req.user || !req.user.id) {
      logger.error('no user injected into hdl get all');
      return res.sendStatus(401);
    }
    const result = await cholesterolService.getAll(req.user.id, 'hdl');
    return res.json(result.rows);
  });
};
