import * as https from 'https';
import config from './config';
import app from './app';
import { listeningListener } from './utils/listening-listener';

export const httpsServer = https.createServer(config.httpsOptions, app)
  .listen(config.sslPort, listeningListener);
