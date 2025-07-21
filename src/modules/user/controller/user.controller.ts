import { Body, Controller, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "../application/dto/create-user.dto";
import { CreateUserUseCase } from "../application/use-cases/command/create-user.use-case";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { User } from "../domain/user";
import { GetAllUserUseCase } from "../application/use-cases/query/get-all-user.use-case";

@Controller('user')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly getAllUserUseCase: GetAllUserUseCase
    ) { }
    @Get()
    async getAllUser(@Query() query: PaginationDto): Promise<PaginatedResponse<User>> {
        return await this.getAllUserUseCase.execute(query);
    }

    @Get(':id')
    async getOneUser() { }

    @Get('email')
    async getByEmail(@Query() email: string) { }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const user = await this.createUserUseCase.execute(dto);
        return user;
    }

    @Patch()
    async updateUser() { }

    @Delete()
    async hardDeleteUser() { }

    @Delete()
    async softDeleteUser() { }

    @Patch()
    async restoreUser() { }
}