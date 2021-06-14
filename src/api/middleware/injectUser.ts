import { container } from 'tsyringe';
import { Response } from 'express';
import { Logger } from 'winston';
import UserModel from '../models/user';

export default async function injectUser(req: any, res: Response, next: Function) {
  const logger: Logger = container.resolve('logger');
  try {
    const userModel = container.resolve(UserModel);
    const { claims: { uid } } = req.jwt;
    const currentUser = await userModel.getUserFromOktaId(uid);
    if (!currentUser) {
      return res.status(401);
    }

    req.currentUser = currentUser;
    return next();
  } catch (error) {
    logger.error('There was an issue attaching current user by oktaId');
    return next(error);
  }
}
