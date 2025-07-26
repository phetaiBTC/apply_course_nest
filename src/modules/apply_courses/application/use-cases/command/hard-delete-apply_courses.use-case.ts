import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ApplyCoursesRepository } from "src/modules/apply_courses/domain/apply_courses.repository";

@Injectable()
export class HardDeleteApplyCoursesUseCase {
    constructor(
        @Inject('ApplyCoursesRepository') private readonly applyCoursesRepository: ApplyCoursesRepository,
    ) {}

    async execute(id:number): Promise<{ message: string }> {
        const course = await this.applyCoursesRepository.findOne(id)
        if(!course) throw new NotFoundException('ApplyCourses not found')
        return this.applyCoursesRepository.hardDelete(id)
    }
}