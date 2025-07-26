import { Body, Controller, Get, Post, Query, Patch, Param, Delete } from "@nestjs/common";
import { GetOneCourseCompletionRecordsUseCase } from "../application/use-cases/query/get-one-course_completion_records.use-case";
import { CourseCompletionRecordsMapper } from "../mapper/course_completion_records.mapper";
import { CourseCompletionRecordsDto } from "../application/dto/create-course_completion_records.dto";
import { CurrentUser } from "src/shared/decorators/user.decorator";
import { CreateCourseCompletionRecordsUseCase } from "../application/use-cases/command/create-course_completion_records.use-case";
import { UserPayload } from "src/modules/auth/interface/auth.interface";
import { GetAllCourseCompletionRecordsUseCase } from "../application/use-cases/query/get-all-course_completion_records.use-case";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { UpdateCourseCompletionRecordsUseCase } from "../application/use-cases/command/update-course_completion_records.use-case";
import { HardDeleteCourseCompletionRecordsUseCase } from "../application/use-cases/command/hard-delete-course_completion_records.use-case";
import { SoftDeleteCourseCompletionRecordsUseCase } from "../application/use-cases/command/soft-delete-course_completion_records.use-case";
import { RestoreCourseCompletionRecordsUseCase } from "../application/use-cases/command/restore-course_completion_records.use-case";
import { CourseCompletionRecordsResponse } from "../interface/course_completion_records.interface";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Controller('course-completion-records')
export class CourseCompletionRecordsController {
    constructor(
        private readonly getOneCourseCompletionRecordsUseCase: GetOneCourseCompletionRecordsUseCase,
        private readonly createCourseCompletionRecordsUseCase: CreateCourseCompletionRecordsUseCase,
        private readonly getAllCourseCompletionRecordsUseCase: GetAllCourseCompletionRecordsUseCase,
        private readonly updateCourseCompletionRecordsUseCase: UpdateCourseCompletionRecordsUseCase,
        private readonly hardDeleteCourseCompletionRecordsUseCase: HardDeleteCourseCompletionRecordsUseCase,
        private readonly softDeleteCourseCompletionRecordsUseCase: SoftDeleteCourseCompletionRecordsUseCase,
        private readonly restoreCourseCompletionRecordsUseCase: RestoreCourseCompletionRecordsUseCase
    ) { }

    @Get(':id')
    async getOne(id: number): Promise<CourseCompletionRecordsResponse> {
        return CourseCompletionRecordsMapper.toResponse(await this.getOneCourseCompletionRecordsUseCase.execute(id));
    }

    @Post()
    async create(@CurrentUser() user: UserPayload, @Body() dto: CourseCompletionRecordsDto): Promise<CourseCompletionRecordsResponse> {
        return CourseCompletionRecordsMapper.toResponse(await this.createCourseCompletionRecordsUseCase.execute(dto, user.sub));
    }

    @Get()
    async getAll(@Query() query: PaginationDto): Promise<PaginatedResponse<CourseCompletionRecordsResponse>> {
        const course_completion_records = await this.getAllCourseCompletionRecordsUseCase.execute(query);
        return CourseCompletionRecordsMapper.toResponseList(course_completion_records.data, course_completion_records.pagination);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto: CourseCompletionRecordsDto, @CurrentUser() user: UserPayload): Promise<CourseCompletionRecordsResponse> {
        return CourseCompletionRecordsMapper.toResponse(await this.updateCourseCompletionRecordsUseCase.execute(id, dto, user.sub));
    }

    @Delete('hard/:id')
    async hardDelete(@Param('id') id: number) {
        return this.hardDeleteCourseCompletionRecordsUseCase.execute(id);
    }

    @Delete('soft/:id')
    async softDelete(@Param('id') id: number) {
        return this.softDeleteCourseCompletionRecordsUseCase.execute(id);
    }

    @Patch('restore/:id')
    async restore(@Param('id') id: number) {
        return this.restoreCourseCompletionRecordsUseCase.execute(id);
    }
}