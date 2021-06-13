import { Request, Response, Router } from 'express';
import HDL from './routes/HDL';
import heartRate from './routes/heartRate';
import LDL from './routes/LDL';
import user from './routes/user';

export default () => {
    const appRouter = Router();
    HDL(appRouter);
    heartRate(appRouter);
    LDL(appRouter);
    user(appRouter);

    appRouter.get('', (req: Request, res: Response) => {
        return res.status(200).send("hello world");
    })

    return appRouter; 
}