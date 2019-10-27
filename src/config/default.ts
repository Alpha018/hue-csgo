import path from 'path';
import { readFileSync } from 'fs';

const config = {
  env: process.env.NODE_ENV || 'development',
  sslPort: 8080,
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
  colors: {
    terrorist: '#de9b35',
    counterT: '#5d79ae',
    bombPlanted: '#FF0000',
    roundWin: '#6CFF1D',
    roundLose: '#FF7D1D',
    freezeTime: '#00ffff',
  },
};

export default config;
