import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateStudentUseCase } from "../application/use-cases/command/create-student.use-case";
import { CreateStudentDto } from "../application/dto/create-student.dto";
import { GetOneStudentUseCase } from "../application/use-cases/query/get-one-student.use-case";
import { StudentMapper } from "../mapper/student.mapper";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { GetAllStudentUseCase } from "../application/use-cases/query/get-all-student.use-case";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { StudentResponse } from "../interface/student.interface";
import { UpdateStudentUseCase } from "../application/use-cases/command/update-student.use-case";
import { UpdateStudentDto } from "../application/dto/update-student.dto";
import { SoftDeleteStudentUseCase } from "../application/use-cases/command/soft-delete-student.use-case";
import { HardDeleteStudentUseCase } from "../application/use-cases/command/hard-delete-student.use-case";
import { RestoreStudentUseCase } from "../application/use-cases/command/restore-student.use-case";

@Controller('student')
export class StudentController {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase,
        private readonly getOneStudentUseCase: GetOneStudentUseCase,
        private readonly getAllStudentUseCase: GetAllStudentUseCase,
        private readonly updateStudentUseCase: UpdateStudentUseCase,
        private readonly softDeleteStudentUseCase: SoftDeleteStudentUseCase,
        private readonly hardDeleteStudentUseCase: HardDeleteStudentUseCase,
        private readonly restoreStudentUseCase: RestoreStudentUseCase
    ){}

    @Post()
    async create(@Body() student: CreateStudentDto){
        return await this.createStudentUseCase.execute(student);
    }

    @Get(':id')
    async getOne(@Param('id') id: number){
        return StudentMapper.toResponse(await this.getOneStudentUseCase.execute(id));
    }

    @Get()
    async getAll(@Query() query: PaginationDto): Promise<PaginatedResponse<StudentResponse>>{
        const students = await this.getAllStudentUseCase.execute(query);
        return StudentMapper.toResponseList(students.data, students.pagination);
    }

    @Patch(':id')
    async update(@Param('id') id: number , @Body() dto: UpdateStudentDto){
        return StudentMapper.toResponse(await this.updateStudentUseCase.execute(id, dto));
    }

    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number){
        return await this.hardDeleteStudentUseCase.execute(id);
    }

    @Delete('soft/:id')
    async softDelete(@Param('id') id: number){
        return await this.softDeleteStudentUseCase.execute(id);
    }

    @Patch('restore/:id')
    async restore(@Param('id') id: number){
        return await this.restoreStudentUseCase.execute(id);
    }
}