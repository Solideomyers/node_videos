import { Router } from 'express';
import { VideoRoutes } from '../videos/video.routes';
import { UserRoutes } from '../users/user.routes';
import { AuthRoutes } from '../authtentication/auth.routes';
import { AppDataSource } from '../db/db';
import { UserEntity } from '../users/entities/user.entity';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    const userRepository = AppDataSource.getRepository(UserEntity);

    const videoRoutes = new VideoRoutes();
    const authRoutes = new AuthRoutes(userRepository);

    router.use('/', videoRoutes.getRouter(), authRoutes.getRouter());

    return router;
  }
}
