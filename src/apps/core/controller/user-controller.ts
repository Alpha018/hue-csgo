import { Request, Response } from 'express';

export class UserController {

  async getUsers(req: Request, res: Response) {
    res.send([{
      name: 'foo',
    }, {
      name: 'bar',
    }]);
  }
}
