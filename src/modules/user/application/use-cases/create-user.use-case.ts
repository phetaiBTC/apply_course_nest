import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domain/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) { }
  async create(dto: CreateUserDto): Promise<User> {
    const exist = await this.userRepository.findByEmail(dto.email);
    if (exist) {
      throw new Error('Email already exists');
    }
    const user = new User(null, dto.name, dto.email, dto.surname, dto.password);
    return this.userRepository.create(user);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
