import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CourseCategory } from "src/modules/course_category/domain/course_category";
import { CourseCategoryRepository } from "src/modules/course_category/domain/course_category.repository";
import { CourseCategoryMapper } from "src/modules/course_category/mapper/course_category.mapper";

@Injectable()
export class GetOneCourseCategoryUseCase {
    constructor(
        @Inject('CourseCategoryRepository') private readonly courseCategoryRepository: CourseCategoryRepository
    ) { }

    async execute(id: number): Promise<CourseCategory> {
        const category = await this.courseCategoryRepository.findOne(id);
        if (!category) throw new BadRequestException('Category not found');
        return category
    }
}