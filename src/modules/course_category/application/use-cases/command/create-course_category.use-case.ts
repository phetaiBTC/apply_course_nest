import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CourseCategory } from "src/modules/course_category/domain/course_category";
import { CourseCategoryRepository } from "src/modules/course_category/domain/course_category.repository";
import { CourseCategoryDto } from "../../dto/create-course_category.dto";

@Injectable()
export class CreateCourseCategoryUseCase {
    constructor(
        @Inject('CourseCategoryRepository') private readonly courseCategoryRepository: CourseCategoryRepository
    ) { }

    async execute(category: CourseCategoryDto): Promise<CourseCategory> {
        const nameExists = await this.courseCategoryRepository.findByName(category.name);
        if (nameExists) throw new BadRequestException('Category name already exists');
        const categoryDomain = new CourseCategory({
            name: category.name
        });
        return this.courseCategoryRepository.save(categoryDomain);
    }
}