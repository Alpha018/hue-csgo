import { HealthController } from '../controller';
import { BaseRouter } from '../../../utils/base-router';

export class HealthRoutes extends BaseRouter {

  public static path = '/health';

  configRoute() {
    const controller: HealthController = new HealthController();

    /**
     * @swagger
     * /health:
     *   get:
     *     tags:
     *       - health
     *     summary: health
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     parameters:
     *     responses:
     *       200:
     *     security:
     *       - Bearer: []
     */
    this._router.get('/', controller.health);
  }
}
