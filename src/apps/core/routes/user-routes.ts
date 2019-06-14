import { UserController } from '../controller/user-controller';
import { BaseRouter } from '../../../utils/base-router';

export class UserRoutes extends BaseRouter {

  public static path = '/api/user';

  configRoute() {
    const controller: UserController = new UserController();

    /**
     * @swagger
     * /api/user:
     *   get:
     *     tags:
     *       - user
     *       - core
     *     summary: get all users
     *     produces:
     *       - application/json
     *     consumes:
     *       - application/json
     *     parameters:
     *     responses:
     *       200:
     *         description: return access token
     *         schema:
     *           $ref: '#/definitions/User'
     *       403:
     *         description: unauthorized
     *         schema:
     *           $ref: '#/definitions/Error'
     *     security:
     *       - Bearer: []
     */
    this._router.get('/', controller.getUsers);
  }
}
