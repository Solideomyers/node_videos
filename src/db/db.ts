import { DataSource } from 'typeorm';
import { envs } from '../config/envs';
import { VideoEntity } from '../videos/entities/video.entity';
import { UserEntity } from '../users/entities/user.entity';
import { LikeEntity } from '../likes/entities/like.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.DB_LOCALHOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [VideoEntity, LikeEntity, UserEntity],
  subscribers: [],
  migrations: [],
});
