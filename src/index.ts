import * as http from 'http';
import config from './config';
import app from './app';
import { listeningListener } from './utils/listening-listener';

export const httpsServer = http.createServer(app)
  .listen(config.sslPort, listeningListener);
