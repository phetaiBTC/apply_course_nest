import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { UserRepository } from '../domain/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepo.save(user);
  }

  async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
    await this.userRepo.update(id, user);
    const updatedUser = await this.userRepo.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }


  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepo.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findOneBy({ email });
  }
}
