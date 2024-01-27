"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("../src/config/envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: envs_1.envs.DB_LOCALHOST,
    port: envs_1.envs.DB_PORT,
    username: envs_1.envs.DB_USER,
    password: envs_1.envs.DB_PASSWORD,
    database: envs_1.envs.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
