import { Body, Controller, Get, Post, Query, Patch, Param, Delete } from "@nestjs/common";
import { CreateCourseDto } from "../application/dto/create-course.dto";
import { CreateCourseUseCase } from "../application/use-cases/command/create-course.use-case";
import { Course } from "../domain/course";
import { PaginatedResponse } from "src/shared/interface/pagination-response";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { GetAllCourseUseCase } from "../application/use-cases/query/get-all-course.use-case";
import { HardDeleteCourseUseCase } from "../application/use-cases/command/hard-delete-course.use-case";
import { SoftDeleteCourseUseCase } from "../application/use-cases/command/soft-delete-course.use-case";
import { RestoreCourseUseCase } from "../application/use-cases/command/restore-course.use-case";
import { UpdateCourseUseCase } from "../application/use-cases/command/update-course.use-case";
import { GetOneCourseUseCase } from "../application/use-cases/query/get-one-course.use-case";
import { CourseMapper } from "../mapper/course.mapper";
import { CourseResponse } from "../interface/course.interface";
import { Permissions } from "src/shared/decorators/permissions.decorator";

@Controller('course')
export class CourseController {
    constructor(
        private readonly createCourseUseCase: CreateCourseUseCase,
        private readonly getAllCourseCategoryUseCase: GetAllCourseUseCase,
        private readonly hardDeleteCourseUseCase: HardDeleteCourseUseCase,
        private readonly softDeleteCourseUseCase: SoftDeleteCourseUseCase,
        private readonly restoreCourseUseCase: RestoreCourseUseCase,
        private readonly updateCourseUseCase: UpdateCourseUseCase,
        private readonly getOneCourseUseCase: GetOneCourseUseCase
    ) { }
    @Permissions('create_course')
    @Post()
    async create(@Body() dto: CreateCourseDto): Promise<CourseResponse> {
        return CourseMapper.toResponse(await this.createCourseUseCase.execute(dto));
    }
    @Permissions('get_all_course')
    @Get()
    async findAll(@Query() pagination: PaginationDto): Promise<PaginatedResponse<CourseResponse>> {
        const courses = await this.getAllCourseCategoryUseCase.execute(pagination);
        return CourseMapper.toResponseList(courses.data, courses.pagination);
    }
    @Permissions('hard_delete_course')
    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number): Promise<{ message: string }> {
        return await this.hardDeleteCourseUseCase.execute(id);
    }
    @Permissions('soft_delete_course')
    @Delete('soft/:id')
    async softDelete(@Param('id') id: number): Promise<{ message: string }> {
        return await this.softDeleteCourseUseCase.execute(id);
    }
    @Permissions('restore_course')
    @Patch('restore/:id')
    async restore(@Param('id') id: number): Promise<{ message: string }> {
        return await this.restoreCourseUseCase.execute(id);
    }
    @Permissions('update_course')
    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: CreateCourseDto): Promise<CourseResponse> {
        return CourseMapper.toResponse(await this.updateCourseUseCase.execute(id, dto));
    }
    @Permissions('get_one_course')
    @Get(':id')
    async findOne(@Param('id') id: number) {
        return CourseMapper.toResponse(await this.getOneCourseUseCase.execute(id));
    }

}