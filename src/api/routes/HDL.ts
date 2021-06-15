import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from 'winston';
import CholesterolService from '../services/cholesterol';
import requireAuthentication from '../middleware/requireAuthentication';
import injectUser from '../middleware/injectUser';

const router = Router();
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

  router.get('/id/:id', requireAuthentication, injectUser, async (req: any, res: Response) => {
    const result = await cholesterolService.getById(req.params.id, req.user.id, 'hdl');
    if (result.rowCount === 0) {
      logger.warn(`No results returned for hdl get by id with id = ${req.params.id}`);
      return res.sendStatus(404);
    }
    return res.json(result.rows[0]);
  });

  router.post('', requireAuthentication, injectUser, async (req: any, res: Response) => {
    if (!req.body.level) {
      return res.sendStatus(400);
    }
    if (!req.user) {
      return res.sendStatus(401);
    }
    const entryId: number = await cholesterolService.create(req.user.id, req.body.level, 'hdl');
    res.location(`${req.protocol}://${req.get('host')}${req.originalUrl}/id/${entryId}`);
    return res.sendStatus(201);
  });
};
