import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/command/create-user.use-case';
import { IUserResponse, UserResponseMapper } from '../infrastructure/mappers/user-response.mapper';
import { ListUserUseCase } from '../application/use-cases/query/list-users.use-case';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { IpaginationQuery } from 'src/shared/interface/pagination-interface';
import { GetUserByIdUseCase } from '../application/use-cases/query/get-user-by-id.use-case';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly ListUserUseCase: ListUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase
  ) { }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(dto);
    return UserResponseMapper.toResponse(user);
  }

  @Get()
  async list(@Query() paginationQuery: PaginationQueryDto) {
    const users = await this.ListUserUseCase.execute(paginationQuery);
    return UserResponseMapper.toResponses(users.data, users.count);
  }

  @Get('/:id')
  async get(@Param('id') id: number) {
    const user = await this.getUserByIdUseCase.execute(id);
    return user ? UserResponseMapper.toResponse(user) : null;
  }
}
