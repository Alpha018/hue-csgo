import path from 'path';
import lodash from 'lodash';
import { default as defaults } from './default';

const config = require(path.join(__dirname, defaults.env));  // using commonjs

export default lodash.defaults({
  ...defaults,
  ...config.default,
});
