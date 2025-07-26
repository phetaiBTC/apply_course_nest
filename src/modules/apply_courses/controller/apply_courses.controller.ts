import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateApplyCoursesUseCase } from "../application/use-cases/command/create-apply_courses.use-case";
import { GetOneApplyCoursesUseCase } from "../application/use-cases/query/get-one-apply_courses.use-case";
import { GetAllApplyCoursesUseCase } from "../application/use-cases/query/get-all-apply_courses.use-case";
import { UpdateApplyCoursesUseCase } from "../application/use-cases/command/update-apply_courses.use-case";
import { SoftDeleteApplyCoursesUseCase } from "../application/use-cases/command/soft-delete-apply_courses.use-case";
import { HardDeleteApplyCoursesUseCase } from "../application/use-cases/command/hard-delete-apply_courses.use-case";
import { RestoreApplyCoursesUseCase } from "../application/use-cases/command/restore-apply_courses.use-case";
import { CreateApplyCoursesDto } from "../application/dto/create-apply_courses.dto";
import { ApplyCoursesResponse } from "../interface/apply_courses.interface";
import { ApplyCoursesMapper } from "../mapper/apply_courses.mapper";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('apply-courses')
export class ApplyCoursesController {
    constructor(
        private readonly createApplyCoursesUseCase: CreateApplyCoursesUseCase,
        private readonly getOneApplyCoursesUseCase: GetOneApplyCoursesUseCase,
        private readonly getAllApplyCoursesUseCase: GetAllApplyCoursesUseCase,
        private readonly updateApplyCoursesUseCase: UpdateApplyCoursesUseCase,
        private readonly softDeleteApplyCoursesUseCase: SoftDeleteApplyCoursesUseCase,
        private readonly hardDeleteApplyCoursesUseCase: HardDeleteApplyCoursesUseCase,
        private readonly restoreApplyCoursesUseCase: RestoreApplyCoursesUseCase
    ) { }
    @Permissions('create_apply_courses')
    @Post()
    async create(@Body() dto: CreateApplyCoursesDto): Promise<ApplyCoursesResponse> {
        return ApplyCoursesMapper.toResponse(await this.createApplyCoursesUseCase.execute(dto));
    }
    @Permissions('get_one_apply_courses')
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<ApplyCoursesResponse> {
        return ApplyCoursesMapper.toResponse(await this.getOneApplyCoursesUseCase.execute(id));
    }
    @Permissions('get_all_apply_courses')
    @Get()
    async getAll(@Query() query: PaginationDto): Promise<PaginatedResponse<ApplyCoursesResponse>> {
        const ApplyCourses = await this.getAllApplyCoursesUseCase.execute(query);
        return ApplyCoursesMapper.toResponseList(ApplyCourses.data, ApplyCourses.pagination);
    }
    @Permissions('update_apply_courses')
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: CreateApplyCoursesDto): Promise<ApplyCoursesResponse> {
        return ApplyCoursesMapper.toResponse(await this.updateApplyCoursesUseCase.execute(id, dto));
    }
    @Permissions('soft_delete_apply_courses')
    @Delete('soft/:id')
    async softDelete(@Param('id') id: number): Promise<{ message: string }> {
        return await this.softDeleteApplyCoursesUseCase.execute(id);
    }
    @Permissions('hard_delete_apply_courses')
    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
        return await this.hardDeleteApplyCoursesUseCase.execute(id);
    }
    @Permissions('restore_apply_courses')
    @Patch('restore/:id')
    async restore(@Param('id') id: number): Promise<{ message: string }> {
        return await this.restoreApplyCoursesUseCase.execute(id);
    }
}