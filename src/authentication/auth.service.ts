import bcrypt from 'bcryptjs';
import { CustomError } from '../errors/custom.errors';
import { UserEntity } from '../users/entities/user.entity';
import { generateToken } from '../config/jwt';
import { Repository } from 'typeorm';

export class AuthService {
  constructor(private userRepository: Repository<UserEntity>) {}

  async signUp(name: string, email: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw CustomError.badRequest('El correo electrónico ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 6);
    const newUser = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return generateToken({ id: newUser.id });
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw CustomError.notFound('Usuario no encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw CustomError.unauthorized('Credenciales inválidas');
    }

    return generateToken({ id: user.id });
  }
}
