import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),

  DB_PORT: get('DB_PORT').required().asPortNumber(),

  DB_USER: get('DB_USER').required().asString(),
  DB_PASSWORD: get('DB_PASSWORD').required().asString(),
  DB_LOCALHOST: get('DB_LOCALHOST').required().asString(),

  DB_NAME: get('DB_NAME').required().asString(),

  JWT_SECRET: get('JWT_SECRET').required().asString(),
  // TOKEN_EXPIRATION: get('TOKEN_EXPIRATION').required().asString(),
};
