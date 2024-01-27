import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { CustomError } from '../errors/custom.errors';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppDataSource } from '../db/db';

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = AppDataSource.getRepository(UserEntity);
    this.userService = new UserService(userRepository);
  }

  async createUser(req: Request, res: Response) {
    try {
      const userDto: CreateUserDto = req.body;

      // Crear el usuario utilizando el servicio
      const createUser = await this.userService.createUser(userDto);

      // Responder con el usuario creado y el token JWT
      res.status(201).json(createUser);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users: UserEntity[] = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error al obtener todos los usuarios:', error);
      res.status(500).json({ message: 'Error al obtener todos los usuarios' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const user: UserEntity = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error al obtener el usuario por ID:', error);
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Usuario no encontrado' });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id);
      const updateDto: UpdateUserDto = req.body;

      const updatedUser: UserEntity = await this.userService.updateUser(
        id,
        updateDto
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }
}
