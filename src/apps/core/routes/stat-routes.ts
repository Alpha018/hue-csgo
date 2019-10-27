import { StatController } from '../controller/stat-controller';
import { BaseRouter } from '../../../utils/base-router';

export class StatRoutes extends BaseRouter {

  public static path = '/';

  configRoute() {
    const controller: StatController = new StatController();

    /**
     * @swagger
     * /:
     *   post:
     *     tags:
     *       - stat
     *       - core
     *     summary: get all users
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     parameters:
     *     responses:
     *       200:
     *         description: return the same request
     */
    this._router.post('/', controller.receiveInfo);
  }
}
