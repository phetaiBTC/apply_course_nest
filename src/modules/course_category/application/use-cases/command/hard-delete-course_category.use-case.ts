import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CourseCategory } from "src/modules/course_category/domain/course_category";
import { CourseCategoryRepository } from "src/modules/course_category/domain/course_category.repository";
import { CourseCategoryDto } from "../../dto/create-course_category.dto";

@Injectable()
export class HardDeleteCourseCategoryUseCase {
    constructor(
        @Inject('CourseCategoryRepository') private readonly courseCategoryRepository: CourseCategoryRepository
    ) { }

    async execute(id: number): Promise<{ message: string }> {
        const category = await this.courseCategoryRepository.findOne(id);
        if (!category) throw new BadRequestException('Category not found');
        return this.courseCategoryRepository.hardDelete(id);
    }
}