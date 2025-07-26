import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CourseRepository } from "src/modules/course/domain/course.repository";

@Injectable()
export class HardDeleteCourseUseCase {
    constructor(
        @Inject('CourseRepository') private readonly courseRepository: CourseRepository
    ) { }

    async execute(id: number): Promise<{ message: string }> {
        const course = await this.courseRepository.findOne(id);
        if (!course) throw new NotFoundException('Course not found');
        return await this.courseRepository.hardDelete(id);
    }
}