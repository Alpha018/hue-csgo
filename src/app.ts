import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { logger } from '@reignmodule/utils';

import config from './config';
import { errors } from './utils/errors';
import { HealthRoutes } from './apps/health/routes';
import { StatRoutes } from './apps/core/routes/stat-routes';
import { SwaggerRoutes } from './apps/docs/routes';
import { HueSingleton } from './apps/core/singleton/hue-singleton';

// Create Express server
class Server {
  public app: express.Application;

  constructor() {
    this.app = express();

    HueSingleton.getInstance();
    this.config();
    this.swaggerSetup();
    this.routes();
    this.errorSetup();
  }

  public static bootstrap(): Server {
    return new Server();
  }

  config() {
    // Express configuration
    this.app.use(bodyParser.urlencoded(
      {
        extended: true,
      },
    ));
    this.app.use(bodyParser.json(
      {
        inflate: true,
      },
    ));

    // Allow Cross-Origin Resource Sharing and basic security
    this.app.use(cors());
    this.app.use(helmet());
  }

  private swaggerSetup() {

  }

  private static handleFatalError(err: any): void {
    logger.error(`'[fatal error]' ${err && err.message}`);
    logger.error(`'[fatal error]' ${err && err.stack}`);
    process.exit(1);
  }

  private errorSetup(): void {
    process.on('uncaughtException', Server.handleFatalError);
    process.on('unhandledRejection', Server.handleFatalError);

    this.app.use((err: any, req: express.Request, res: express.Response,
                  next: express.NextFunction) => {
      if (err.name === 'UnauthorizedError') {
        logger.error(err);
        next(new errors.UNAUTHORIZED({}));
      } else {
        next(err);
      }
    });

    this.app.use((err: any, req: express.Request, res: express.Response,
                  next: express.NextFunction) => {
      let responseError = err;

      if (!(responseError instanceof errors.BaseError)) {
        logger.error(err.stack);
        responseError = new errors.UNEXPECTED_ERROR({});

        /* istanbul ignore next */
        if (['development', 'test'].indexOf(config.env) >= 0) {
          responseError = new errors.UNEXPECTED_ERROR(err.toString());
        }
      }

      const errorMsg = [`${responseError.status}`, `${responseError.description}`,
        `${req.originalUrl}`, `${req.method}`, `${req.ip}`];
      logger.error(errorMsg.join(' - '));

      return res.status(responseError.status).json(responseError);
    });
  }

  routes() {
    /**
     * Primary app routes.
     */
    this.app.use(SwaggerRoutes.path, new SwaggerRoutes().router);
    this.app.use(HealthRoutes.path, new HealthRoutes().router);
    this.app.use(StatRoutes.path, new StatRoutes().router);
  }

}

export default new Server().app;
