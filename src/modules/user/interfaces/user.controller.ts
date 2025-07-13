import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/command/create-user.use-case';
import { UserResponseMapper } from '../infrastructure/mappers/user-response.mapper';
import { ListUserUseCase } from '../application/use-cases/query/list-users.use-case';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly ListUserUseCase: ListUserUseCase,
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
}
