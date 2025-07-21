import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Public } from "src/shared/decorators/auth.decorator";
import { CreateStudentUseCase } from "../application/use-cases/command/create-student.use-case";
import { createStudentDto } from "../application/dto/create-student.dto";
import { GetStudentByIdUseCase } from "../application/use-cases/query/get-student-by-id.use-case";
import { StudentResponseMapper } from "../infrastructure/mappers/student-response.mapper";
import { PaginationQueryDto } from "src/shared/dto/pagination-query.dto";
import { GetStudentAllUseCase } from "../application/use-cases/query/get-student-all.user-case";
import { DeleteStudentUseCase } from "../application/use-cases/command/delete-student.use-case";
import { UpdateStudentDto } from "../application/dto/update-student.dto";
import { UpdateStudentUseCase } from "../application/use-cases/command/update-student.use-case";

@Controller('students')
export class StudentController {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase,
        private readonly getStudentByIdUseCase: GetStudentByIdUseCase,
        private readonly getStudentAllUseCase: GetStudentAllUseCase,
        private readonly deleteStudentUseCase: DeleteStudentUseCase,
        private readonly updateStudentUseCase: UpdateStudentUseCase
    ) { }
    @Public()
    @Post()
    async create(@Body() dto: createStudentDto) {
        return this.createStudentUseCase.execute(dto)
    }

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

    @Patch('/:id')
    async update(@Param('id') id: number, @Body() dto: UpdateStudentDto) {
        return this.updateStudentUseCase.execute(id, dto);
    }
}