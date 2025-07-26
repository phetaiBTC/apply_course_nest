import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Course } from "src/modules/course/domain/course";
import { CourseRepository } from "src/modules/course/domain/course.repository";

@Injectable()
export class GetOneCourseUseCase {
    constructor(
        @Inject('CourseRepository') private readonly courseRepository: CourseRepository
    ) { }

    async execute(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne(id);
        if (!course) throw new NotFoundException('Course not found');
        return course;
    }
}