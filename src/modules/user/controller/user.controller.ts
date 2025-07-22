import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "../application/dto/create-user.dto";
import { CreateUserUseCase } from "../application/use-cases/command/create-user.use-case";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { GetAllUserUseCase } from "../application/use-cases/query/get-all-user.use-case";
import { UserResponse } from "../interface/user.interface";
import { UserMapper } from "../mapper/user.mapper";
import { GetOneUserUseCase } from "../application/use-cases/query/get-one-user.use-case";
import { GetUserByEmailUseCase } from "../application/use-cases/query/get-by-email-use.case";
import { HardDeleteUserUseCase } from "../application/use-cases/command/hard-delete-user.use-case";
import { SoftDeleteUserUseCase } from "../application/use-cases/command/soft-delete-user.use-case";
import { RestoreUserUseCase } from "../application/use-cases/command/restore-user.use-case";
import { UpdateUserDto } from "../application/dto/update-user.dto";
import { UpdateUserUseCase } from "../application/use-cases/command/update-user.use-case";

@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getAllUserUseCase: GetAllUserUseCase,
        private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
        private readonly getOneUserUseCase: GetOneUserUseCase,
        private readonly hardDeleteUserUseCase: HardDeleteUserUseCase,
        private readonly softDeleteUserUseCase: SoftDeleteUserUseCase,
        private readonly restoreUserUseCase: RestoreUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase
    ) { }

    @Get()
    async getAllUser(@Query() query: PaginationDto): Promise<PaginatedResponse<UserResponse>> {
        const users = await this.getAllUserUseCase.execute(query);
        return UserMapper.toResponseList(users.data, users.pagination);
    }
    @Get('email')
    async getByEmail(@Query('email') email: string): Promise<UserResponse> {
        return UserMapper.toResponse(await this.getUserByEmailUseCase.execute(email));
    }
    @Get(':id')
    async getOneUser(@Param('id') id: number): Promise<UserResponse> {
        return UserMapper.toResponse(await this.getOneUserUseCase.execute(id));
    }
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const user = await this.createUserUseCase.execute(dto);
        return user;
    }
    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return await this.updateUserUseCase.execute(id, dto);
    }
    @Delete('hard/:id')
    async hardDeleteUser(@Param('id') id: number): Promise<{ message: string }> {
        return await this.hardDeleteUserUseCase.execute(id);
    }
    @Delete('soft/:id')
    async softDeleteUser(@Param('id') id: number) {
        return await this.softDeleteUserUseCase.execute(id);
    }
    @Patch('restore/:id')
    async restoreUser(@Param('id') id: number) {
        return await this.restoreUserUseCase.execute(id);
    }
}