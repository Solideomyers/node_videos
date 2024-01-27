import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomError } from '../errors/custom.errors';

export class UserService {
  constructor(private userRepository: Repository<UserEntity>) {}
  async createUser(userDto: CreateUserDto) {
    // Crear una nueva instancia de UserEntity a partir de los datos del DTO
    const user = new UserEntity();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;
    user.userName = userDto.email;

    // Guardar el nuevo user en la base de datos
    await this.userRepository.save(user);

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw CustomError.notFound('Usuario no encontrado');
    }
    return user;
  }

  async updateUser(id: number, updateDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw CustomError.notFound('User no encontrado');
    }

    if (updateDto.name) {
      user.name = updateDto.name;
    }

    if (updateDto.password) {
      user.password = updateDto.password;
    }

    return await this.userRepository.save(user);
  }
}
