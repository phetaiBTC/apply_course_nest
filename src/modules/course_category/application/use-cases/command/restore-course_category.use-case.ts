import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CourseCategoryRepository } from "src/modules/course_category/domain/course_category.repository";

@Injectable()
export class RestoreCourseCategoryUseCase {
    constructor(
        @Inject('CourseCategoryRepository') private readonly courseCategoryRepository: CourseCategoryRepository
    ) { }

    async execute(id: number): Promise<{ message: string }> {
        const category = await this.courseCategoryRepository.findOne(id);
        if (!category) throw new BadRequestException('Category not found');
        return this.courseCategoryRepository.restore(id);
    }
}