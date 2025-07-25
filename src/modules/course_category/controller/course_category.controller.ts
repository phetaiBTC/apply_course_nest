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

    @Post()
    async create(@Body() category: CourseCategoryDto): Promise<CourseCategoryResponse> {
        return CourseCategoryMapper.toResponse(await this.createCourseCategoryUseCase.execute(category));
    }

    @Get(':id')
    async getOne(@Param('id') id: number): Promise<CourseCategoryResponse> {
        return CourseCategoryMapper.toResponse(await this.getOneCourseCategoryUseCase.execute(id));
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() category: CourseCategoryDto): Promise<CourseCategoryResponse> {
        return CourseCategoryMapper.toResponse(await this.updateCourseCategoryUseCase.execute(id, category));
    }

    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
        return this.hardDeleteCourseCategoryUseCase.execute(id);
    }

    @Delete('soft/:id')
    async softDelete(@Param('id') id: number): Promise<{ message: string }> {
        return this.softDeleteCourseCategoryUseCase.execute(id);
    }

    @Patch('restore/:id')
    async restore(@Param('id') id: number): Promise<{ message: string }> {
        return this.restoreCourseCategoryUseCase.execute(id);
    }

    @Get()
    async findAll(@Query() pagination: PaginationDto): Promise<PaginatedResponse<CourseCategoryResponse>> {
        const categories = await this.getAllCourseCategoryUseCase.execute(pagination);
        return CourseCategoryMapper.toResponseList(categories.data, categories.pagination);
    }
}