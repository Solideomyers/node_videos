import { Router } from 'express';
import { UserController } from './user.controller';

export class UserRoutes {
  private router: Router;
  private userController: UserController;
  //   private likeController: LikeController;
  constructor() {
    this.router = Router();
    // this.userController = new UserController;
    // this.likeController = new LikeController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/user', async (req, res) => {
      await this.userController.createUser(req, res);
    });

    this.router.get('/user', async (req, res) => {
      await this.userController.getAllUsers(req, res);
    });

    this.router.get('/user/:id', async (req, res) => {
      await this.userController.getUserById(req, res);
    });

    this.router.put('/user/:id', async (req, res) => {
      await this.userController.updateUser(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
