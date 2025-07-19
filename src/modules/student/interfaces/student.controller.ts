// import { Body, Controller, Get, Post, Query } from '@nestjs/common';
// import { CreateUserDto } from '../application/dto/create-user.dto';
// import { CreateUserUseCase } from '../application/use-cases/command/create-user.use-case';
// import { UserResponseMapper } from '../infrastructure/mappers/user-response.mapper';
// import { ListUserUseCase } from '../application/use-cases/query/list-users.use-case';
// import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { Public } from "src/shared/decorators/auth.decorator";
import { CreateStudentUseCase } from "../application/use-cases/command/create-student.use-case";
import { createStudentDto } from "../application/dto/create-student.dto";
import { console } from "inspector";
import { UserResponseMapper } from "src/modules/user/infrastructure/mappers/user-response.mapper";
import { GetStudentByIdUseCase } from "../application/use-cases/query/get-student-by-id.use-case";
import { StudentResponseMapper } from "../infrastructure/mappers/student-response.mapper";
import { PaginationQueryDto } from "src/shared/dto/pagination-query.dto";
import { IpaginationQuery } from "src/shared/interface/pagination-interface";
import { Student } from "../domain/student.entity";
import { GetStudentAllUseCase } from "../application/use-cases/query/get-student-all.user-case";
import { DeleteStudentUseCase } from "../application/use-cases/command/delete-student.use-case";

@Controller('students')
export class StudentController {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase,
        private readonly getStudentByIdUseCase: GetStudentByIdUseCase,
        private readonly getStudentAllUseCase: GetStudentAllUseCase,
        private readonly deleteStudentUseCase: DeleteStudentUseCase,
    ) { }
    @Public()
    @Post()
    async create(@Body() dto: createStudentDto) {
        // console.log("Creating student with data:", dto);
        return this.createStudentUseCase.execute(dto)
    }


    @Public()
    @Get()
    async getAll(@Query() paginationQuery: PaginationQueryDto) {

        const students = await this.getStudentAllUseCase.execute(paginationQuery);
        return StudentResponseMapper.toResponses(students.data, students.count);
    }

    @Public()
    @Get("/:id")
    async get(@Param('id') id: number) {
        const student = await this.getStudentByIdUseCase.execute(+id);
        return student ? StudentResponseMapper.toResponse(student) : null;
    }

    @Public()
    @Delete("/:id")
    async getUser(@Param('id') id: number) {
        return await this.deleteStudentUseCase.execute(+id);
    }



}