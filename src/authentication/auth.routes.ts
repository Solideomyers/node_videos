import { Router } from 'express';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';

export class AuthRoutes {
  private router: Router;
  private authService: AuthService;

  constructor(userRepository: Repository<UserEntity>) {
    this.router = Router();
    this.authService = new AuthService(userRepository);
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/signup', async (req, res) => {
      const { name, email, password } = req.body;
      console.log(name, email, password);
      try {
        const token = await this.authService.signUp(name, email, password);
        res.status(201).json({ token });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    });

    this.router.post('/signin', async (req, res) => {
      const { email, password } = req.body;
      try {
        const token = await this.authService.signIn(email, password);
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: error });
      }
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
