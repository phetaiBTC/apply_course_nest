// import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { CreateUserDto } from '../application/dto/create-user.dto';
// import { CreateUserUseCase } from '../application/use-cases/command/create-user.use-case';
// import { UserResponseMapper } from '../infrastructure/mappers/user-response.mapper';
// import { ListUserUseCase } from '../application/use-cases/query/list-users.use-case';
// import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/shared/decorators/auth.decorator";
import { CreateStudentUseCase } from "../application/use-cases/command/create-student.use-case";
import { createStudentDto } from "../application/dto/create-student.dto";
import { console } from "inspector";

@Controller('students')
export class StudentController {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase
    ) { }
    @Public()
    @Post()
    async create(@Body() dto: createStudentDto) {
        console.log("Creating student with data:", dto);
        return this.createStudentUseCase.execute(dto)
    }
}