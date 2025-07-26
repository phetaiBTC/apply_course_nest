import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ApplyCourses } from "src/modules/apply_courses/domain/apply_courses";
import { ApplyCoursesRepository } from "src/modules/apply_courses/domain/apply_courses.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllApplyCoursesUseCase {
    constructor(
        @Inject('ApplyCoursesRepository') private readonly applyCoursesRepository: ApplyCoursesRepository,
    ) {}

    async execute(query: PaginationDto): Promise<PaginatedResponse<ApplyCourses>> {
        return this.applyCoursesRepository.findAll(query)
    }
}