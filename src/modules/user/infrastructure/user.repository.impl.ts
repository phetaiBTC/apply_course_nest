import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { UserRepository } from '../domain/user.repository';
import { UserMapper } from './mappers/user.mapper';
import { User } from '../domain/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }
  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users.map(UserMapper.toDomain);
  }
  async create(user: User): Promise<User> {
    const orm = UserMapper.toOrm(user);
    const saved = await this.userRepo.save(orm);
    return UserMapper.toDomain(saved);
  }

  async update(id: number, user: User): Promise<User> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedOrm = UserMapper.toOrm(user);
    updatedOrm.id = id;
    const updated = await this.userRepo.save(updatedOrm);
    return UserMapper.toDomain(updated);
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async hardDelete(id: number): Promise<void> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  async softDelete(id: number): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    user.deletedAt = new Date(); // Set the deletedAt field
    await this.userRepo.save(UserMapper.toOrm(user));
  }
}
