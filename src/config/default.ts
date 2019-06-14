import path from 'path';
import { readFileSync } from 'fs';

const config = {
  env: process.env.NODE_ENV || 'development',
  sslPort: 3000,
  appName: process.env.APPLICATION_NAME,
  httpOptions: {},
  httpsOptions: {
    key: process.env.HTTPS_KEY || readFileSync(
      path.join(__dirname, '..', '..', 'etc', 'ssl', 'server.key'),
    ).toString(),
    cert: process.env.HTTPS_CERT || readFileSync(
      path.join(__dirname, '..', '..', 'etc', 'ssl', 'server.crt'),
    ).toString(),
  },
};

export default config;
