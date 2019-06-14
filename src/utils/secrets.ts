import dotenv from 'dotenv';
import fs from 'fs';
import { logger } from '@reignmodule/utils';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' }); // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
