import { Body, Controller, Get, Post, Query, Param, Patch, Delete } from "@nestjs/common";
import { CreateTeacherDto } from "../application/dto/create-teacher.dto";
import { CreateTeacherUseCase } from "../application/use-cases/command/create-teacher.use-case";
import { TeacherMapper } from "../mapper/teacher.mapper";
import { teacherResponse } from "../interface/teacher.interface";
import { GetAllTeacherUseCase } from "../application/use-cases/query/get-all-teacher.use-case";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { GetOneTeacherUseCase } from "../application/use-cases/query/get-one-teacher.use-case";
import { HardDeleteTeacherUseCase } from "../application/use-cases/command/hard-delete-teacher.use-case";
import { SoftDeleteTeacherUseCase } from "../application/use-cases/command/soft-delete-teacher.use-case";
import { UpdateTeacherUseCase } from "../application/use-cases/command/update-teacher.use-case";
import { RestoreTeacherUseCase } from "../application/use-cases/command/restore-teacher.use-case";
import { UpdateTeacherDto } from "../application/dto/update-teacher.dto";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly createTeacherUseCase: CreateTeacherUseCase,
        private readonly getAllTeacherUseCase: GetAllTeacherUseCase,
        private readonly getOneTeacherUseCase: GetOneTeacherUseCase,
        private readonly hardDeleteTeacherUseCase: HardDeleteTeacherUseCase,
        private readonly softDeleteTeacherUseCase: SoftDeleteTeacherUseCase,
        private readonly updateTeacherUseCase: UpdateTeacherUseCase,
        private readonly restoreTeacherUseCase: RestoreTeacherUseCase
    ) { }
    @Permissions('create_teacher')
    @Post()
    async create(@Body() dto: CreateTeacherDto): Promise<teacherResponse> {
        return TeacherMapper.toResponse(await this.createTeacherUseCase.execute(dto));
    }
    @Permissions('get_all_teacher')
    @Get()
    async getAll(@Query() query: PaginationDto): Promise<PaginatedResponse<teacherResponse>> {
        const teachers = await this.getAllTeacherUseCase.execute(query);
        return TeacherMapper.toResponseList(teachers.data, teachers.pagination);
    }
    @Permissions('get_one_teacher')
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<teacherResponse> {
        return TeacherMapper.toResponse(await this.getOneTeacherUseCase.execute(id));
    }
    @Permissions('update_teacher')
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateTeacherDto): Promise<teacherResponse> {
        return TeacherMapper.toResponse(await this.updateTeacherUseCase.execute(id, dto));
    }
    @Permissions('hard_delete_teacher')
    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
        return await this.hardDeleteTeacherUseCase.execute(id);
    }
    @Permissions('soft_delete_teacher')
    @Delete('soft/:id')
    async softDelete(@Param('id') id: number): Promise<{ message: string }> {
        return await this.softDeleteTeacherUseCase.execute(id);
    }
    @Permissions('restore_teacher')
    @Patch('restore/:id')
    async restore(@Param('id') id: number): Promise<{ message: string }> {
        return await this.restoreTeacherUseCase.execute(id);
    }
}