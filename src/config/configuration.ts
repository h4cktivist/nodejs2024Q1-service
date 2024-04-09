import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CRYPT_SALT: parseInt(process.env.CRYPT_SALT),
});
