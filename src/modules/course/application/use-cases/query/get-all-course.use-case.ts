import { Inject, Injectable } from "@nestjs/common";
import { CourseRepository } from "src/modules/course/domain/course.repository";
import { PaginationDto } from "src/shared/dto/paginationDto";

@Injectable()
export class GetAllCourseUseCase {
    constructor(
        @Inject('CourseRepository')
        private readonly courseRepository: CourseRepository,
    ) { }

    async execute(query: PaginationDto) {
        return this.courseRepository.findAll(query);
    }
}