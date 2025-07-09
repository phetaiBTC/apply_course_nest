import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) { }

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    const exist = await this.userRepository.findByEmail(dto.email);
    if (exist) {
      throw new Error('Email already exists');
    }
    const newUser = await this.userRepository.create(dto);
    return newUser;
  }
}
