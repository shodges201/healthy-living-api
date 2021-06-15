import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { Logger } from 'winston';
import UserService from '../services/user';
import requireAuthentication from '../middleware/requireAuthentication';
import injectUser from '../middleware/injectUser';

const router = Router();

export default (appRouter: Router) => {
  appRouter.use('/user', router);
  const userService = container.resolve(UserService);
  const logger: Logger = container.resolve<Logger>('logger');

  router.get('/', async (req: Request, res: Response) => res.status(200));

  router.get('/all', requireAuthentication,
    injectUser,
    async (req: any, res: Response) => {
      const result = await userService.getAll();
      return res.json(result.rows);
    });

  router.get('id/:id', requireAuthentication,
    injectUser,
    async (req: any, res: Response) => {
      const user = await userService.getFromOktaId(req.params.id);
      return res.status(200).json(user);
    });

  router.post('/register', async (req: Request, res: Response) => {
    try {
      const user = await userService.create(req, res);
    } catch (error) {
      logger.error(error.message);
      return res.sendStatus(500);
    }
    return res.sendStatus(200);
  });

  router.get('/login', async (req: Request, res: Response) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    if (!username || !password) {
      return res.sendStatus(401);
    }
    try {
      const resultJson = await userService.login(username, password);
      return res.status(200).json(resultJson);
    } catch (error) {
      logger.error(error);
      if (error.status === 401 || error.status === 400) {
        return res.sendStatus(401);
      }
      return res.sendStatus(500);
    }
  });
};
