import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CourseCategory } from "src/modules/course_category/domain/course_category";
import { CourseCategoryRepository } from "src/modules/course_category/domain/course_category.repository";
import { CourseCategoryMapper } from "src/modules/course_category/mapper/course_category.mapper";
import { PaginationDto } from "src/shared/dto/paginationDto";
import { PaginatedResponse } from "src/shared/interface/pagination-response";

@Injectable()
export class GetAllCourseCategoryUseCase {
    constructor(
        @Inject('CourseCategoryRepository') private readonly courseCategoryRepository: CourseCategoryRepository
    ) { }

    async execute(query:PaginationDto): Promise<PaginatedResponse<CourseCategory>> {
        return this.courseCategoryRepository.findAll(query);
    }
}