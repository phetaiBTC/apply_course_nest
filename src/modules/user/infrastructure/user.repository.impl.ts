import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infrastructure/typeorm/user.orm-entity';
import { UserRepository } from '../domain/user.repository';
import { UserMapper } from './mappers/user.mapper';
import { User } from '../domain/user.entity';
import { IpaginationQuery } from 'src/shared/interface/pagination-interface';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { hashPassword } from 'src/shared/utils/bcrypt.util';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }
  async findAll(paginationQuery: PaginationQueryDto): Promise<IpaginationQuery<User[]>> {
    const { limit = 10, offset = 1, search = '' } = paginationQuery;
    const skip = (offset - 1) * limit;
    const qb = this.userRepo.createQueryBuilder('user');
    if (search) {
      qb.where('user.name LIKE :search OR user.email LIKE :search', { search: `%${search}%` });
    }
    const [users, count] = await qb
      .orderBy('user.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const userEntities = users.map(UserMapper.toDomain);

    return {
      data: userEntities,
      count,
    };
  }

  async create(user: User): Promise<User> {
    const orm = UserMapper.toOrm(user);
    const Cuser = await this.userRepo.create({
      name: orm.name,
      email: orm.email,
      surname: orm.surname,
      password: await hashPassword(orm.password),
    });
    const saved = await this.userRepo.save(Cuser);
    return UserMapper.toDomain(saved);
  }

  async update(id: number, user: User): Promise<User> {
    const ormEntity = UserMapper.toOrm(user);
    await this.userRepo.update(id, ormEntity);
    const updatedEntity = await this.userRepo.findOneBy({ id });
    if (!updatedEntity) {
      throw new Error(`User with ID ${id} not found`);
    }
    return UserMapper.toDomain(updatedEntity);
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
    await this.userRepo.delete(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.userRepo.softDelete(id);
  }

  async searchByName(name: string): Promise<User[]> {
    const users = await this.userRepo
      .createQueryBuilder('user')
      .where('user.name LIKE :name', { name: `%${name}%` })
      .getMany();
    return users.map(UserMapper.toDomain);
  }
}
