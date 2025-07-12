import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { UserResponseMapper } from '../infrastructure/mappers/user-response.mapper';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const user = await this.createUserUseCase.create(dto);
    return UserResponseMapper.toResponse(user);
  }

  @Get()
  async findAll() {
    const users = await this.createUserUseCase.findAll();
    return UserResponseMapper.toResponses(users);
  }
}
