import { Controller, Get, Query, Param, Patch, Delete, Post, Body } from "@nestjs/common";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { CreateEducationDto } from "../application/dto/create-student_education.dto";
import { CreateEducationUseCase } from "../application/use-cases/command/create-student_education.use-case";
import { GetOneEducationUseCase } from "../application/use-cases/query/get-one-student_education.use-case";
import { UpdateEducationUseCase } from "../application/use-cases/command/update-student_education.use-case";
import { HardDeleteEducationUseCase } from "../application/use-cases/command/hard-delete-student_education.use-case";
import { UpdateEducationDto } from "../application/dto/update-student_education.dto";
import { Student_educationMapper } from "../mapper/student_education.mapper";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('education')
export class StudentEducationController {
    constructor(
        private readonly createEducationUseCase: CreateEducationUseCase,
        private readonly getOneEducationUseCase: GetOneEducationUseCase,
        private readonly updateEducationUseCase: UpdateEducationUseCase,
        private readonly hardDeleteEducationUseCase: HardDeleteEducationUseCase
    ) { }
    @Permissions('create_student_education')
    @Post()
    async create(@Body() dto: CreateEducationDto) {
        return Student_educationMapper.toResponse(await this.createEducationUseCase.execute(dto))
    }

    @Permissions('get_one_student_education')
    @Get(':id')
    async getOne(@Param('id') id: number) {
        return Student_educationMapper.toResponse(await this.getOneEducationUseCase.execute(id))
    }

    @Permissions('update_student_education')
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateEducationDto) {
        return Student_educationMapper.toResponse(await this.updateEducationUseCase.execute(id, dto))
    }

    @Permissions('hard_delete_student_education')
    @Delete('hard/:id')
    hardDelete(@Param('id') id: number) {
        return this.hardDeleteEducationUseCase.execute(id)
    }

}