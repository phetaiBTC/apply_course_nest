import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/command/create-user.use-case';
import { IUserResponse, UserResponseMapper } from '../infrastructure/mappers/user-response.mapper';
import { ListUserUseCase } from '../application/use-cases/query/list-users.use-case';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { IpaginationQuery } from 'src/shared/interface/pagination-interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly ListUserUseCase: ListUserUseCase,
  ) { }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<IUserResponse> {
    const user = await this.createUserUseCase.execute(dto);
    return UserResponseMapper.toResponse(user);
  }

  @Get()
  async list(@Query() paginationQuery: PaginationQueryDto): Promise<IpaginationQuery<IUserResponse[]>> {
    const users = await this.ListUserUseCase.execute(paginationQuery);
    return UserResponseMapper.toResponses(users.data, users.count);
  }
}
