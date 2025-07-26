import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ApplyCourses } from "src/modules/apply_courses/domain/apply_courses";
import { ApplyCoursesRepository } from "src/modules/apply_courses/domain/apply_courses.repository";

@Injectable()
export class GetOneApplyCoursesUseCase {
    constructor(
        @Inject('ApplyCoursesRepository') private readonly applyCoursesRepository: ApplyCoursesRepository,
    ) { }

    async execute(id: number): Promise<ApplyCourses> {
        const course = await this.applyCoursesRepository.findOne(id)
        if (!course) throw new NotFoundException('ApplyCourses not found')
        return course
    }
}