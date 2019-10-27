import { Request, Response, NextFunction } from 'express';
import { RequestCounter } from '../../types/models';
import { StatTasker } from '../tasker/stat-tasker';

export class StatController {

  async receiveInfo(req: Request, res: Response, next: NextFunction) {
    const playStat: RequestCounter = req.body;

    try {
      await StatTasker.getStatus(playStat);
      res.status(200).send(playStat);
    } catch (e) {
      next(e);
    }
  }
}
