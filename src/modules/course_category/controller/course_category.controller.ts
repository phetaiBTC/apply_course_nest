import { Body, Controller, Get, Post, Param, Patch, Delete, Query } from "@nestjs/common";
import { CreateCourseCategoryUseCase } from "../application/use-cases/command/create-course_category.use-case";
import { CourseCategoryDto } from "../application/dto/create-course_category.dto";
import { CourseCategory } from "../domain/course_category";
import { UpdateCourseCategoryUseCase } from "../application/use-cases/command/update-course_category.use-case";
import { HardDeleteCourseCategoryUseCase } from "../application/use-cases/command/hard-delete-course_category.use-case";
import { SoftDeleteCourseCategoryUseCase } from "../application/use-cases/command/soft-delete-course_category.use-case";
import { GetOneCourseCategoryUseCase } from "../application/use-cases/query/get-one-course_category.use-case";
import { RestoreCourseCategoryUseCase } from "../application/use-cases/command/restore-course_category.use-case";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { GetAllCourseCategoryUseCase } from "../application/use-cases/query/get-all-course_category.use-case";
import { CourseCategoryResponse } from "../interface/course_category.interface";
import { CourseCategoryMapper } from "../mapper/course_category.mapper";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('course_category')
export class CourseCategoryController {
    constructor(
        private readonly createCourseCategoryUseCase: CreateCourseCategoryUseCase,
        private readonly updateCourseCategoryUseCase: UpdateCourseCategoryUseCase,
        private readonly restoreCourseCategoryUseCase: RestoreCourseCategoryUseCase,
        private readonly hardDeleteCourseCategoryUseCase: HardDeleteCourseCategoryUseCase,
        private readonly softDeleteCourseCategoryUseCase: SoftDeleteCourseCategoryUseCase,
        private readonly getOneCourseCategoryUseCase: GetOneCourseCategoryUseCase,
        private readonly getAllCourseCategoryUseCase: GetAllCourseCategoryUseCase,
    ) { }
    @Permissions('create_course_category')
    @Post()
    async create(@Body() category: CourseCategoryDto): Promise<CourseCategoryResponse> {
        return CourseCategoryMapper.toResponse(await this.createCourseCategoryUseCase.execute(category));
    }
    @Permissions('get_one_course_category')
    @Get(':id')
    async getOne(@Param('id') id: number): Promise<CourseCategoryResponse> {
        return CourseCategoryMapper.toResponse(await this.getOneCourseCategoryUseCase.execute(id));
    }
    @Permissions('update_course_category')
    @Patch(':id')
    async update(@Param('id') id: number, @Body() category: CourseCategoryDto): Promise<CourseCategoryResponse> {
        return CourseCategoryMapper.toResponse(await this.updateCourseCategoryUseCase.execute(id, category));
    }
    @Permissions('hard_delete_course_category')
    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
        return this.hardDeleteCourseCategoryUseCase.execute(id);
    }
    @Permissions('soft_delete_course_category')
    @Delete('soft/:id')
    async softDelete(@Param('id') id: number): Promise<{ message: string }> {
        return this.softDeleteCourseCategoryUseCase.execute(id);
    }
    @Permissions('restore_course_category')
    @Patch('restore/:id')
    async restore(@Param('id') id: number): Promise<{ message: string }> {
        return this.restoreCourseCategoryUseCase.execute(id);
    }
    @Permissions('get_all_course_category')
    @Get()
    async findAll(@Query() pagination: PaginationDto): Promise<PaginatedResponse<CourseCategoryResponse>> {
        const categories = await this.getAllCourseCategoryUseCase.execute(pagination);
        return CourseCategoryMapper.toResponseList(categories.data, categories.pagination);
    }
}