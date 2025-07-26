import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CourseCompletionRecords } from "src/modules/course_completion_records/domain/course_completion_records";
import { CourseCompletionRecordsRepository } from "src/modules/course_completion_records/domain/course_completion_records.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllCourseCompletionRecordsUseCase {
    constructor(
        @Inject('CourseCompletionRecordsRepository')
        private readonly courseCompletionRecordsRepository: CourseCompletionRecordsRepository
    ) { }

    async execute(query: PaginationDto): Promise<PaginatedResponse<CourseCompletionRecords>> {
        return await this.courseCompletionRecordsRepository.findAll(query)
    }
}